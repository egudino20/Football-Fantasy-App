# FutHub Fantasy Football

## Overview

FutHub Fantasy Football is a comprehensive fantasy soccer platform that allows users to create and manage private fantasy leagues across Europe's top 5 football competitions (English Premier League, La Liga, Bundesliga, Serie A, and Ligue 1). The app features a Fantrax-inspired dark-themed interface with advanced analytics and predictive insights, sourcing real-time player statistics and performance data from WhoScored.com. Users can draft players, track live scores, receive player recommendations, and compete with friends using user friendly real time information based on statistical modeling and performance predictions.

## Features

- **Dark-Themed UI**: Fantrax-inspired interface
- **5 European Leagues**: EPL, La Liga, Bundesliga, Serie A, Ligue 1
- **League Creation**: 3-step wizard with H2H Points scoring
- **Invite System**: Email invites and shareable links
- **Local Storage**: Data persists across sessions
- **League Sidebar**: Navigation for league features (placeholders)
- **Authentication Ready**: Log In/Sign Up buttons (coming soon)

**In Progress:**
- League Setup & Configuration (Milestone 2) - Tab navigation complete, adding content next

**Coming Soon:**
- Player Database & Search (Milestone 3)
- Draft System (Milestone 4)
- Live Scoring & Tracking (Milestone 5)
- Advanced Analytics (Milestone 6)

## Tech Stack

- **Frontend**: React 18+ with functional components and hooks
- **Styling**: Tailwind CSS for responsive, utility-first design
- **State Management**: React Context API + Local Storage for data persistence
- **Data Source**: WhoScored.com API integration (real-time player and match data)
- **Charts/Visualization**: Recharts for analytics dashboards
- **Build Tool**: Vite for fast development and optimized production builds

## Development Milestones

### Milestone 1: League Selection, Creation & Invite ✅

**What's Included:**
- Pick from 5 European football leagues (EPL, La Liga, Bundesliga, Serie A, Ligue 1)
- Create or Join league options (Join is placeholder)
- 3-step league creation wizard:
  - Step 2: Choose league type (H2H - Points)
  - Step 3: Enter league details (name, team name, format, draft type)
- Invite friends screen with:
  - Email invite button
  - Copy invite link button
  - League Setup button (placeholder for Milestone 2)
  - League Home button (placeholder)
- League sidebar navigation (all placeholders)
- Data persists in localStorage

**How to Test:**
1. Select a league (e.g., EPL)
2. Click "Create League"
3. Click "Go" on H2H - Points
4. Fill in league name and team name
5. Click "Create League"
6. View invite friends screen
7. Test "Email Invite" and "Copy Invite Link"
8. Click sidebar items (placeholders)
9. Refresh browser - data persists

---

### Milestone 2: League Setup (In Progress)

**Commissioner Mode Only:**
League creators (commissioners) can configure their league settings. Users who joined a league will see the "League Setup" button greyed out.

**What's Included:**
- Tab navigation system with 8 setup sections:
  - General - Basic league settings
  - Teams and Schedules - League size and matchweek schedules
  - Player Pool - Available players for the league
  - Rosters - Team roster configuration
  - Scoring - Points system for player actions
  - Transactions and Periods - Waiver wire and trade settings
  - Draft - Draft date, time, and format
  - Misc - Additional league options
- Three action buttons (bottom right):
  - **Save** - Saves current tab settings
  - **Save and Continue** - Saves and moves to next tab
  - **Submit** - Greyed out until all tabs are completed, finalizes all settings
- Tab completion tracking (marks tabs as configured when saved)
- Settings stored in localStorage (will be backend API in future)
- League sidebar navigation remains visible
- Back button to return to Invite Friends screen
- Each tab currently shows placeholder content

**How to Test:**
1. Create a league (complete Milestone 1)
2. From Invite Friends screen, click "League Setup"
3. View the 8 tabs at the top
4. Click each tab to see it switch (content is placeholder)
5. Test action buttons:
   - Click "Save" - marks tab as completed
   - Click "Save and Continue" - saves and moves to next tab
   - Notice "Submit" is greyed out
   - Save all 8 tabs to enable "Submit" button
   - Click "Submit" to finalize settings
6. Click "Back to Invite Friends" to return

**Note:** Only commissioners can access League Setup. League members will have view-only access to league settings.

---

### Milestone 3: Player Database (Coming Soon)
- Browse players from all leagues
- Search and filter functionality
- Player stats and ratings

---

### Milestone 4: Draft System (Coming Soon)
- Snake draft functionality
- Team building with roster limits
- Draft room interface

---

### Milestone 5: Live Scoring (Coming Soon)
- Live gameweek tracking
- Automatic point calculation
- Real-time leaderboards

---

### Milestone 6: Analytics (Coming Soon)
- Player form trends
- Fixture difficulty ratings
- Transfer recommendations

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
│   ├── data/              # Static data and configuration
│   │   └── competitions.js
│   ├── utils/             # Utility functions and helpers
│   │   └── localStorage.js
│   ├── App.jsx            # Main app component (all screens and logic)
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles with Tailwind
├── public/                # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## User Interface

### Main Sidebar (Guest View)
- User profile with Log In/Sign Up buttons
- Alerts, Profile sections
- Games: Season-Long, Cash Games, Mock Draft, Public Leagues
- Other: Forums, Support, FAQ, etc.
- All items are placeholders

### League Sidebar (After Creating League)
- League info display
- Navigation: League, Roster, Matchups, Players, Draft Room, Commissioner, Standings, Team, Transactions, Fantasy Advice
- Chat section with General channel
- All items are placeholders

### Main Dashboard
- League picker with 5 competitions
- Create/Join league options
- League creation wizard (Steps 2 & 3)
- Invite friends screen with email and link sharing
- League Setup and League Home buttons

## Data Integration

The app integrates with WhoScored.com to fetch:
- Player statistics and ratings
- Live match scores and events
- Team standings and fixtures
- Injury reports and suspensions
- Historical performance data

## Future Enhancements

- Authentication system (login/signup)
- Join league with invite codes
- League setup and configuration
- Player database with real-time stats from WhoScored.com
- Draft room functionality
- Live scoring and matchweek tracking
- Head-to-head matchups
- Waiver wire and free agent system
- Trade system
- Advanced analytics and predictions
- Mobile app
- Additional leagues (MLS, Eredivisie, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

---

**Note**: This app is for educational and entertainment purposes. Always respect data source terms of service and rate limits when implementing API integrations.

