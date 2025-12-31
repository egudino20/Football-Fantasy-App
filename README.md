# Fantasy Football League Manager

## Overview

Fantasy Football League Manager is a comprehensive fantasy soccer platform that allows users to create and manage private leagues across Europe's top 5 football competitions (English Premier League, La Liga, Bundesliga, Serie A, and Ligue 1). The app combines Fantrax-style league management and scoring with ESPN-level advanced analytics and predictive insights, sourcing real-time player statistics and performance data from WhoScored.com. Users can draft players, track live scores, receive player recommendations, and compete with friends using cutting-edge statistical modeling and performance predictions.

## Features

- **Multi-League Support**: Create leagues for EPL, La Liga, Bundesliga, Serie A, and Ligue 1 with extensible architecture for future leagues
- **Private Group Leagues**: Invite friends and manage custom scoring rules and roster formats
- **Real-Time Data**: Live player stats, match scores, and injury updates from WhoScored.com
- **Advanced Analytics**: Predictive player performance models, matchup analysis, and trend forecasting
- **Smart Draft Assistant**: AI-powered draft recommendations based on value projections
- **Custom Scoring**: Flexible scoring categories and roster configurations
- **Mobile-Responsive**: Fully optimized for desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18+ with functional components and hooks
- **Styling**: Tailwind CSS for responsive, utility-first design
- **State Management**: React Context API + Local Storage for data persistence
- **Data Source**: WhoScored.com API integration (real-time player and match data)
- **Charts/Visualization**: Recharts for analytics dashboards
- **Build Tool**: Vite for fast development and optimized production builds

## Development Milestones

### Milestone 1: League Creation & Setup ✅
**Testable Feature**: Users can create a new fantasy league by selecting a competition (EPL, La Liga, etc.), setting league name, number of teams, and basic scoring rules. The league configuration is saved to local storage and persists across browser sessions.

**How to Test**:
- Click "Create League" button
- Fill in league details form (name, competition, team count)
- Save and verify the league appears on dashboard
- Refresh browser and confirm league data persists

---

### Milestone 2: Player Database & Search ✅
**Testable Feature**: Browse and search a complete database of players from all 5 leagues with real-time stats (goals, assists, minutes played, form). Search by player name, position, or team with instant filtering and sorting options.

**How to Test**:
- Navigate to "Players" tab
- Search for specific players (e.g., "Salah", "Mbappe")
- Filter by position (GK, DEF, MID, FWD) and league
- Sort by different stats columns (goals, assists, form rating)
- Verify player cards display current season statistics

---

### Milestone 3: Draft System & Team Building ✅
**Testable Feature**: Conduct a snake draft where users can select players in order, with drafted players marked as unavailable. Users build their squad (e.g., 1 GK, 4 DEF, 4 MID, 2 FWD) with roster validation and real-time team value calculation.

**How to Test**:
- Start draft mode for a league
- Select players for your team (click "Draft" button)
- Observe drafted players become unavailable to other teams
- View your current roster with positions filled/remaining
- Verify roster validation (can't exceed position limits)
- Check total team value calculation updates

---

### Milestone 4: Live Scoring & Matchweek Tracking ✅
**Testable Feature**: View live gameweek scores with automatic point calculation based on player performance (goals, assists, clean sheets, etc.). See real-time leaderboard updates and individual player contributions during active matchweeks.

**How to Test**:
- Navigate to "Matchweek" tab during an active gameweek
- View your team's lineup with live point updates
- Check individual player performance cards (updated every 5 min)
- See league standings table with live score updates
- Compare your team's performance against league rivals

---

### Milestone 5: Advanced Analytics Dashboard ✅
**Testable Feature**: Access predictive analytics including upcoming fixture difficulty ratings, player form trends (last 5 games), projected points for next gameweek, and transfer recommendations based on statistical models.

**How to Test**:
- Navigate to "Analytics" section
- View fixture difficulty chart (color-coded easy to hard matchups)
- See player form graphs showing performance trends
- Check "Recommended Transfers" suggestions with reasoning
- View projected points for your squad's next gameweek
- Explore league-wide insights (top performers, breakout candidates)

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/football-fantasy-app.git

# Navigate to project directory
cd football-fantasy-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the app.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
football-fantasy-app/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # Context providers for state management
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services and data fetching
│   ├── utils/             # Utility functions and helpers
│   ├── data/              # Static data and configuration
│   └── App.jsx            # Main app component
├── public/                # Static assets
└── package.json
```

## Data Integration

The app integrates with WhoScored.com to fetch:
- Player statistics and ratings
- Live match scores and events
- Team standings and fixtures
- Injury reports and suspensions
- Historical performance data

## Future Enhancements

- **Head-to-Head Matchups**: Weekly one-on-one competitions
- **Trade System**: Player trading between league members
- **Waiver Wire**: Free agent acquisition system with priority rankings
- **Mobile App**: Native iOS and Android applications
- **Additional Leagues**: Eredivisie, Primeira Liga, MLS expansion
- **Social Features**: League chat, trash talk, and achievements
- **Export/Import**: League data backup and sharing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

---

**Note**: This app is for educational and entertainment purposes. Always respect data source terms of service and rate limits when implementing API integrations.

