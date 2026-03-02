import { NextResponse } from 'next/server';
import axios from 'axios';
import { parseISO } from 'date-fns';

export const dynamic = 'force-dynamic';

// Format date to ICS DTSTART format: 20260611T120000Z
function formatICSDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

// Add 2 hours for match duration
function addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

// Generate a deterministic UID for each match
function generateUID(matchId: number): string {
    return `match-${matchId}@wc-calendar.vercel.app`;
}

export async function GET() {
    try {
        const response = await axios.get(
            'https://api.football-data.org/v4/competitions/WC/matches',
            {
                headers: {
                    'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY,
                },
            }
        );

        const matches = response.data.matches || [];
        const now = new Date();
        const CRLF = '\r\n';

        // Build ICS manually for full RFC 5545 compliance
        let icsLines: string[] = [];

        icsLines.push('BEGIN:VCALENDAR');
        icsLines.push('VERSION:2.0');
        icsLines.push('PRODID:-//WC Calendar//Copa do Mundo 2026//PT');
        icsLines.push('CALSCALE:GREGORIAN');
        icsLines.push('METHOD:PUBLISH');
        icsLines.push('X-WR-CALNAME:Copa do Mundo 2026');
        icsLines.push('X-WR-TIMEZONE:UTC');

        for (const match of matches) {
            const matchDate = parseISO(match.utcDate);
            const endDate = addHours(matchDate, 2);

            const homeTeam = match.homeTeam?.name || 'A Definir';
            const awayTeam = match.awayTeam?.name || 'A Definir';
            const groupOrStage = match.group || (match.stage ? match.stage.replace(/_/g, ' ') : '');
            const venue = match.venue || '';

            const summary = `⚽${homeTeam} x ${awayTeam} - Copa do Mundo 2026`;
            const description = `Jogo da Copa do Mundo 2026.\\nFase/Grupo: ${groupOrStage}${venue ? '\\nEstádio: ' + venue : ''}`;

            icsLines.push('BEGIN:VEVENT');
            icsLines.push(`UID:${generateUID(match.id)}`);
            icsLines.push(`DTSTAMP:${formatICSDate(now)}`);
            icsLines.push(`DTSTART:${formatICSDate(matchDate)}`);
            icsLines.push(`DTEND:${formatICSDate(endDate)}`);
            icsLines.push(`SUMMARY:${summary}`);
            icsLines.push(`DESCRIPTION:${description}`);
            icsLines.push(`STATUS:${match.status === 'FINISHED' ? 'CONFIRMED' : 'TENTATIVE'}`);
            icsLines.push('TRANSP:OPAQUE');
            icsLines.push(`CATEGORIES:Sports,Football,World Cup`);
            icsLines.push('END:VEVENT');
        }

        icsLines.push('END:VCALENDAR');

        const icsContent = icsLines.join(CRLF) + CRLF;

        return new Response(icsContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: 'Failed to fetch match data from football-data' },
            { status: 500 }
        );
    }
}
