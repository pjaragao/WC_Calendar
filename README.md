# World Cup Calendar 2026 🌍🏆

Automated iCalendar (.ics) feed for the FIFA World Cup 2026. Subscribable via Google Calendar, Outlook, and Apple Calendar.

## Features
- ✅ **Dynamic Feed**: Real-time match data from the Football Data API.
- ✅ **Premium UI**: Modern, responsive landing page with dark mode support.
- ✅ **One-Click Subscription**: Easy copy-paste instructions for all major calendar platforms.
- ✅ **Auto-Updates**: Once subscribed, the calendar updates itself as match dates or teams (e.g., knockout stages) are confirmed.

## Setup & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pjaragao/WC_Calendar.git
   cd wc-calendar-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file based on `.env.example`:
   ```bash
   FOOTBALL_DATA_API_KEY=your_api_key_here
   ```
   *Get your free API key at [football-data.org](https://www.football-data.org/).*

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Access the UI at `http://localhost:3000` and the ICS feed at `http://localhost:3000/api/calendar`.

## Deployment (Vercel)

This project is optimized for [Vercel](https://vercel.com/):
1. Connect your GitHub repository to Vercel.
2. Add the `FOOTBALL_DATA_API_KEY` to your project's Environment Variables in the Vercel dashboard.
3. Deploy!

## Credits
Data provided by [football-data.org](https://www.football-data.org/).
