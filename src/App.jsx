import { useState } from 'react';

function App() {
  const [selectedLeague, setSelectedLeague] = useState(null);
  // TODO: Add authentication state in future milestone (isAuthenticated, user data)
  // Users will need to be authenticated to create/join leagues

  const leagues = [
    { id: 'epl', name: 'English Premier League', icon: '⚽', shortName: 'EPL' },
    { id: 'laliga', name: 'Spanish La Liga', icon: '⚽', shortName: 'La Liga' },
    { id: 'bundesliga', name: 'Bundesliga', icon: '⚽', shortName: 'Bundesliga' },
    { id: 'seriea', name: 'Italian Serie A', icon: '⚽', shortName: 'Serie A' },
    { id: 'ligue1', name: 'French Ligue 1', icon: '⚽', shortName: 'Ligue 1' },
  ];

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
    // Future: Navigate to league dashboard
    console.log('Selected league:', league.name);
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        {/* User Profile */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <div className="font-semibold">Guest User</div>
              <div className="text-xs text-slate-400">Fantasy Manager</div>
            </div>
          </div>
          {/* Auth Buttons */}
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition">
              Log In
            </button>
            <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded text-sm font-medium transition">
              Sign Up
            </button>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="px-4 py-3 border-b border-slate-800">
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <span>Alerts</span>
            <span className="text-lg">🔔</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-4 py-3 border-b border-slate-800">
          <div className="text-blue-400 text-sm font-semibold mb-3">Profile</div>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded hover:bg-slate-700 transition">
              <span className="text-xl">👤</span>
              <span className="text-xs">Profile</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded hover:bg-slate-700 transition">
              <span className="text-xl">🔄</span>
              <span className="text-xs">Account</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded hover:bg-slate-700 transition">
              <span className="text-xl">🔒</span>
              <span className="text-xs">Security</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded hover:bg-slate-700 transition">
              <span className="text-xl">📱</span>
              <span className="text-xs">Devices</span>
            </button>
          </div>
        </div>

        {/* Games Section */}
        <div className="px-4 py-3 border-b border-slate-800">
          <div className="text-blue-400 text-sm font-semibold mb-2">Games</div>
          <nav className="space-y-1">
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>🏆</span>
              <span>Season-Long</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>💰</span>
              <span>Cash Games</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>📝</span>
              <span>Mock Draft</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>🌐</span>
              <span>Public Leagues</span>
            </button>
          </nav>
        </div>

        {/* Other Section */}
        <div className="px-4 py-3 flex-1">
          <div className="text-blue-400 text-sm font-semibold mb-2">Other</div>
          <nav className="space-y-1">
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>💬</span>
              <span>Forums</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>🎧</span>
              <span>Support</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>❓</span>
              <span>FAQ</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>🏛️</span>
              <span>Treasurer</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>🔍</span>
              <span>Player Search</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>🏠</span>
              <span>FutHub Home</span>
            </button>
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
              <span>📋</span>
              <span>Terms</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-slate-950 border-b border-slate-800 px-8 py-4">
          <h1 className="text-2xl font-bold">Welcome to FutHub Fantasy Football</h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* Info Banner */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-8 flex items-start gap-4">
            <div className="text-2xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Contact us anytime</h3>
              <p className="text-sm text-slate-300">
                We listen, and we respond ... quickly! The best place to reach us is by clicking/tapping 
                the FutHub X at the top left and then the Support button.
              </p>
            </div>
            <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm transition flex items-center gap-2">
              <span>💬</span>
              <span>Contact us</span>
            </button>
          </div>

          {/* League Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Pick your fantasy football (soccer) league</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl">
              {leagues.map((league) => (
                <button
                  key={league.id}
                  onClick={() => handleLeagueSelect(league)}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-6 transition flex flex-col items-center gap-3 group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {league.icon}
                  </span>
                  <span className="font-semibold text-center">{league.shortName}</span>
                </button>
              ))}
            </div>

            {selectedLeague && (
              <div className="mt-8 p-4 bg-green-900 border border-green-700 rounded-lg">
                <p className="text-green-100">
                  ✓ Selected: <strong>{selectedLeague.name}</strong> - League dashboard coming in next milestone!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 px-8 py-4 text-center text-slate-400 text-sm">
          <p>FutHub Fantasy Football - Milestone 1: League Selection ✅</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
