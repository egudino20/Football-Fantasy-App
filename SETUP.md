# Setup Instructions

## Prerequisites

You need to install Node.js (which includes npm) on your system.

### Install Node.js

1. Download Node.js from: https://nodejs.org/
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the installation wizard
4. Verify installation by opening a new terminal and running:
   ```bash
   node --version
   npm --version
   ```

## Installation

Once Node.js is installed, run these commands in your project directory:

```bash
# Install all dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

## What's Been Created

✅ **Milestone 1 Files:**

1. **src/App.jsx** - Main application with Fantrax-style dark UI, sidebar navigation, and league selection interface
2. **src/data/competitions.js** - List of 5 European competitions
3. **src/utils/localStorage.js** - Helper functions for saving/loading data (ready for future milestones)
4. **src/index.css** - Tailwind CSS setup with dark theme
5. **src/main.jsx** - React entry point

## Testing Milestone 1

Once the dev server is running:

1. ✅ View the dark-themed Fantrax-style interface
2. ✅ See the left sidebar with navigation sections (Profile, Games, Other)
3. ✅ View the main dashboard with "Pick your fantasy football (soccer) league" heading
4. ✅ See 5 league selection cards (EPL, La Liga, Bundesliga, Serie A, Ligue 1)
5. ✅ Click on any league card to select it
6. ✅ Verify confirmation message appears
7. ✅ Test hover effects on league cards
8. ✅ Explore sidebar navigation (placeholders for future features)

## Project Structure

```
Football-Fantasy-App/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app with Fantrax-style UI
│   ├── index.css             # Global styles + Tailwind (dark theme)
│   ├── data/
│   │   └── competitions.js   # 5 European football leagues
│   └── utils/
│       └── localStorage.js   # Storage utilities
└── README.md
```

## Next Steps

After testing Milestone 1, you can:
- Move on to Milestone 2 (Player Database)
- Add more features to league management
- Customize the UI styling

## Troubleshooting

**Port already in use?**
```bash
# The dev server will automatically try the next available port
# Or specify a different port:
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm install
```

