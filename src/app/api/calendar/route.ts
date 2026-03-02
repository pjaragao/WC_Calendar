import { NextResponse } from 'next/server';
import axios from 'axios';
import * as ics from 'ics';
import { parseISO } from 'date-fns';

export const dynamic = 'force-dynamic';

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

        const events = matches.map((match: any) => {
            // API dates are in UTC, example: '2026-06-11T12:00:00Z'
            const matchDateUTC = parseISO(match.utcDate);

            // Parse the date array format required by ics 
            // [year, month, date, hours, minutes]
            const year = matchDateUTC.getUTCFullYear();
            const month = matchDateUTC.getUTCMonth() + 1; // 0-indexed
            const date = matchDateUTC.getUTCDate();
            const hours = matchDateUTC.getUTCHours();
            const minutes = matchDateUTC.getUTCMinutes();

            const homeTeam = match.homeTeam?.name || 'Vencedor Chave';
            const awayTeam = match.awayTeam?.name || 'Vencedor Chave';
            const groupOrStage = match.group || match.stage.replace(/_/g, ' ');

            return {
                start: [year, month, date, hours, minutes],
                duration: { hours: 2, minutes: 0 },
                title: `⚽${homeTeam} x ${awayTeam} - Copa do Mundo 2026`,
                description: `Jogo da Copa do Mundo 2026.\nFase/Grupo: ${groupOrStage}\n${match.venue ? 'Estádio: ' + match.venue : ''
                    }`,
                status: match.status === 'FINISHED' ? 'CONFIRMED' : 'TENTATIVE',
                busyStatus: 'BUSY',
                categories: ['Sports', 'Football', 'Soccer', 'World Cup'],
            };
        });

        // Create the standard iCalendar file content
        const { error, value: icsContent } = ics.createEvents(events as ics.EventAttributes[]);

        if (error) {
            console.error('ICS Generation Error:', error);
            return NextResponse.json({ error: 'Failed to generate calendar' }, { status: 500 });
        }

        // Add Calendar Name for better client support (Google/Outlook/Apple)
        const brandedIcs = icsContent
            .replace('BEGIN:VCALENDAR', 'BEGIN:VCALENDAR\r\nX-WR-CALNAME:Copa do Mundo 2026\r\nNAME:Copa do Mundo 2026\r\nMETHOD:PUBLISH');

        return new Response(brandedIcs, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="copa-do-mundo-2026.ics"',
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
