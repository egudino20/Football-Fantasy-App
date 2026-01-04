# FutHub Fantasy Football

## Overview

FutHub Fantasy Football is a comprehensive fantasy soccer platform that allows users to create and manage private fantasy leagues across Europe's top 5 football competitions (English Premier League, La Liga, Bundesliga, Serie A, and Ligue 1). The app features a Fantrax-inspired dark-themed interface with advanced analytics and predictive insights, sourcing real-time player statistics and performance data from WhoScored.com. Users can draft players, track live scores, receive player recommendations, and compete with friends using user friendly real time information based on statistical modeling and performance predictions.

## Features

- **Dark-Themed Interface**: Professional Fantrax-inspired UI with intuitive sidebar navigation
- **Multi-League Support**: Select from EPL, La Liga, Bundesliga, Serie A, and Ligue 1
- **League Creation Wizard**: 3-step process to create fantasy leagues
  - Step 1: Select competition (5 European leagues available)
  - Step 2: Choose league type (H2H - Points)
  - Step 3: Enter basic settings (league name, team name, format, draft type)
- **League Type - H2H Points**: Head-to-head fantasy matchups with points-based scoring
- **Local Storage**: Leagues persist across browser sessions
- **Authentication Ready**: Log In and Sign Up buttons prepared for future implementation
- **Join League**: (Coming soon) Join existing leagues with invite codes
- **Private Group Leagues**: (Coming soon) Invite friends and customize league settings
- **Real-Time Data**: (Coming soon) Live player stats, match scores, and injury updates from WhoScored.com
- **Advanced Analytics**: (Coming soon) Predictive player performance models and matchup analysis
- **Smart Draft Assistant**: (Coming soon) AI-powered draft recommendations
- **Custom Scoring**: (Coming soon) Flexible scoring categories and roster configurations
- **Mobile-Responsive**: Fully optimized for desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18+ with functional components and hooks
- **Styling**: Tailwind CSS for responsive, utility-first design
- **State Management**: React Context API + Local Storage for data persistence
- **Data Source**: WhoScored.com API integration (real-time player and match data)
- **Charts/Visualization**: Recharts for analytics dashboards
- **Build Tool**: Vite for fast development and optimized production builds

## Development Milestones

### Milestone 1: League Selection & Creation ✅
**Testable Feature**: Users can view a Fantrax-inspired dark-themed interface, select from 5 major European football competitions, and create a new fantasy league with a streamlined 3-step process. The system includes league type selection (H2H - Points) and basic configuration (league name, team name, league format, and draft type).

**How to Test**:
1. **League Selection**:
   - Open the app to see the FutHub Fantasy Football dark interface
   - View the "Pick your fantasy football (soccer) league" heading
   - See 5 league selection cards (EPL, La Liga, Bundesliga, Serie A, Ligue 1)
   - Click on any league card (e.g., English Premier League)

2. **Create or Join League Options**:
   - After selecting a league, see two options: "Create League" and "Join League"
   - Click "Create League" to start the league creation flow
   - (Note: "Join League" is a placeholder for future milestone)

3. **Step 2 - Choose League Type**:
   - View the progress indicator showing Step 2 is active
   - See the "H2H - Points" league type option
   - Read the description of Head-to-Head Points scoring
   - Click "Go" button to proceed

4. **Step 3 - Enter Basic Settings**:
   - Fill in required fields:
     - **League Name**: Enter a name for your league (e.g., "Premier Champions 2025")
     - **Team Name**: Enter your team name (e.g., "FC Winners")
   - View pre-selected dropdown options:
     - **League Format**: "Redraft" (only option for now)
     - **Draft Type**: "Live Online Standard" (only option for now)
   - Click "Create League" button to save

5. **Verification**:
   - Confirm success alert appears with league name
   - League is saved to localStorage
   - Form resets and returns to league selection
   - Can create multiple leagues across different competitions

6. **Navigation**:
   - Test "Back" buttons at each step to return to previous screen
   - Verify all navigation flows work smoothly

**Note**: Authentication will be implemented in a future milestone. Sidebar navigation items are placeholders.

---

### Milestone 2: Player Database & Search ✅
**Testable Feature**: Browse and search a complete database of players from all 5 leagues with real-time stats (goals, assists, minutes played, etc.). Search by player name, position, or team with instant filtering and sorting options.

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
│   │   └── CreateLeagueForm.jsx
│   ├── data/              # Static data and configuration
│   │   └── competitions.js
│   ├── utils/             # Utility functions and helpers
│   │   └── localStorage.js
│   ├── App.jsx            # Main app component with Fantrax-style UI
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles with Tailwind
├── public/                # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## User Interface

The app features a **Fantrax-inspired dark theme** with:

### Sidebar Navigation (Left Panel)
- **User Profile**: Guest user profile with avatar
- **Authentication Buttons**: 
  - **Log In** button (blue) - Placeholder for future authentication
  - **Sign Up** button (gray) - Placeholder for future authentication
  - Note: Users will need to log in or sign up to create/join leagues (to be implemented in future milestone)
- **Alerts**: Notification system (placeholder)
- **Profile Section**: Quick access to Profile, Account, Security, and Devices (placeholders)
- **Games Section**: 
  - Season-Long (active)
  - Cash Games (placeholder)
  - Mock Draft (placeholder)
  - Public Leagues (placeholder)
- **Other Section**: Forums, Support, FAQ, Treasurer, Player Search, FutHub Home, Terms (all placeholders)

### Main Dashboard
- **Welcome Section**: Welcome banner with contact information
- **League Picker**: Grid of 5 football (soccer) competitions
- **Create/Join Options**: After selecting a competition, choose to create or join a league
- **League Creation Wizard**: 
  - Step-by-step progress indicator
  - Step 2: Choose league type (H2H - Points with description)
  - Step 3: Enter league details form with validation
- **Created Leagues**: Leagues saved to localStorage and persist across sessions
- **Navigation**: Back buttons for easy navigation between steps

## Data Integration

The app integrates with WhoScored.com to fetch:
- Player statistics and ratings
- Live match scores and events
- Team standings and fixtures
- Injury reports and suspensions
- Historical performance data

## Future Enhancements

- **Authentication System**: Implement Log In and Sign Up functionality (Milestone 2)
- **League Creation**: Create and manage private leagues after authentication
- **League Dashboard**: View and manage individual league details
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

