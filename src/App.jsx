import { useState, useEffect } from 'react';
import { saveLeagues, getLeagues } from './utils/localStorage';

function App() {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showCreateLeague, setShowCreateLeague] = useState(false);
  const [currentStep, setCurrentStep] = useState(2); // Start at step 2 (league type)
  const [currentLeague, setCurrentLeague] = useState(null); // Currently viewing league
  const [showLeagueSetup, setShowLeagueSetup] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [completedTabs, setCompletedTabs] = useState(new Set());
  const [leagueSettings, setLeagueSettings] = useState({});
  const [leagueData, setLeagueData] = useState({
    leagueType: '',
    leagueName: '',
    teamName: '',
    leagueFormat: 'Redraft',
    draftType: 'Live Online Standard',
  });
  const [createdLeagues, setCreatedLeagues] = useState([]);
  // TODO: Add authentication state in future milestone (isAuthenticated, user data)
  // Users will need to be authenticated to create/join leagues

  const setupTabs = [
    { id: 'general', name: 'General' },
    { id: 'teams', name: 'Teams and Schedules' },
    { id: 'pool', name: 'Player Pool' },
    { id: 'rosters', name: 'Rosters' },
    { id: 'scoring', name: 'Scoring' },
    { id: 'transactions', name: 'Transactions and Periods' },
    { id: 'draft', name: 'Draft' },
    { id: 'misc', name: 'Misc' },
  ];

  const competitions = [
    { id: 'epl', name: 'English Premier League', icon: '⚽', shortName: 'EPL' },
    { id: 'laliga', name: 'Spanish La Liga', icon: '⚽', shortName: 'La Liga' },
    { id: 'bundesliga', name: 'Bundesliga', icon: '⚽', shortName: 'Bundesliga' },
    { id: 'seriea', name: 'Italian Serie A', icon: '⚽', shortName: 'Serie A' },
    { id: 'ligue1', name: 'French Ligue 1', icon: '⚽', shortName: 'Ligue 1' },
  ];

  // Load leagues from localStorage on mount
  useEffect(() => {
    const savedLeagues = getLeagues();
    setCreatedLeagues(savedLeagues);
  }, []);

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
  };

  const handleCreateLeague = () => {
    setShowCreateLeague(true);
    setCurrentStep(2);
  };

  const handleJoinLeague = () => {
    alert('Join League feature coming soon!');
  };

  const handleBack = () => {
    if (showLeagueSetup) {
      setShowLeagueSetup(false);
      setActiveTab('general');
    } else if (currentStep === 2) {
      setShowCreateLeague(false);
      setSelectedLeague(null);
      setLeagueData({
        leagueType: '',
        leagueName: '',
        teamName: '',
        leagueFormat: 'Redraft',
        draftType: 'Live Online Standard',
      });
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentLeague) {
      setCurrentLeague(null);
    }
  };

  const handleSelectLeagueType = (type) => {
    setLeagueData({ ...leagueData, leagueType: type });
    setCurrentStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeagueData({ ...leagueData, [name]: value });
  };

  const handleCreateLeagueSubmit = (e) => {
    e.preventDefault();
    
    if (!leagueData.leagueName || !leagueData.teamName) {
      alert('Please fill in all required fields');
      return;
    }

    const newLeague = {
      id: Date.now().toString(),
      competition: selectedLeague.id,
      competitionName: selectedLeague.name,
      ...leagueData,
      createdAt: new Date().toISOString(),
    };

    const updatedLeagues = [...createdLeagues, newLeague];
    setCreatedLeagues(updatedLeagues);
    saveLeagues(updatedLeagues);

    // Show the invite friends screen
    setShowCreateLeague(false);
    setCurrentStep(2);
    setSelectedLeague(null);
    setCurrentLeague(newLeague);
    setLeagueData({
      leagueType: '',
      leagueName: '',
      teamName: '',
      leagueFormat: 'Redraft',
      draftType: 'Live Online Standard',
    });
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/join/${currentLeague.id}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert('Invite link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link');
    });
  };

  const handleEmailInvite = () => {
    const subject = `Join my ${currentLeague.competitionName} fantasy league!`;
    const body = `You've been invited to join "${currentLeague.leagueName}" on FutHub Fantasy Football!\n\nLeague Code: ${currentLeague.id}\n\nJoin here: ${window.location.origin}/join/${currentLeague.id}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleLeagueSetup = () => {
    setShowLeagueSetup(true);
    setActiveTab('general');
  };

  const handleLeagueHome = () => {
    alert('League Home coming soon!');
  };

  const handleSaveSettings = () => {
    // Mark current tab as completed
    setCompletedTabs(prev => new Set([...prev, activeTab]));
    
    // Save settings to league (will be backend API call in future)
    const updatedSettings = {
      ...leagueSettings,
      [activeTab]: { configured: true, lastSaved: new Date().toISOString() }
    };
    setLeagueSettings(updatedSettings);
    
    // Update the league in localStorage
    if (currentLeague) {
      const updatedLeagues = createdLeagues.map(league => 
        league.id === currentLeague.id 
          ? { ...league, settings: updatedSettings }
          : league
      );
      setCreatedLeagues(updatedLeagues);
      saveLeagues(updatedLeagues);
    }
    
    alert(`${setupTabs.find(t => t.id === activeTab)?.name} settings saved!`);
  };

  const handleSaveAndContinue = () => {
    // Save current tab
    handleSaveSettings();
    
    // Move to next tab
    const currentIndex = setupTabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < setupTabs.length - 1) {
      setActiveTab(setupTabs[currentIndex + 1].id);
    }
  };

  const handleSubmitSettings = () => {
    // TODO: In future, this will submit all settings to backend
    alert('All league settings submitted successfully! League is now fully configured.');
    setShowLeagueSetup(false);
  };

  const allTabsCompleted = setupTabs.every(tab => completedTabs.has(tab.id));

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Left Sidebar - Show different sidebar when viewing a league */}
      {currentLeague || showLeagueSetup ? (
        // League Sidebar
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
          {/* League Info */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                <span className="text-xl">⚽</span>
              </div>
              <div>
                <div className="font-semibold">{currentLeague.leagueName}</div>
                <div className="text-xs text-slate-400">{currentLeague.teamName}</div>
              </div>
            </div>
          </div>

          {/* League Navigation */}
          <div className="flex-1">
            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>🏠</span>
                <span>League</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>👥</span>
                <span>Roster</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>📅</span>
                <span>Matchups</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>👤</span>
                <span>Players</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>📝</span>
                <span>Draft Room</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>⚙️</span>
                <span>Commissioner</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>📊</span>
                <span>Standings</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>👥</span>
                <span>Team</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>🔄</span>
                <span>Transactions</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>💡</span>
                <span>Fantasy Advice</span>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm">
                <span>☰</span>
                <span>Other</span>
              </button>
            </div>
          </div>

          {/* Chat Section */}
          <div className="p-4 border-t border-slate-800">
            <div className="text-blue-400 text-sm font-semibold mb-2">Chat</div>
            <div className="text-xs text-slate-400 mb-2">CHANNELS</div>
            <button className="flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-slate-800 transition text-sm">
              <span>#</span>
              <span>General</span>
            </button>
          </div>
        </aside>
      ) : (
        // Main Sidebar
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
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-slate-950 border-b border-slate-800 px-8 py-4">
          <h1 className="text-2xl font-bold">
            {showLeagueSetup
              ? 'League Setup'
              : currentLeague
              ? 'Invite Friends'
              : showCreateLeague && selectedLeague 
              ? `Create League - ${selectedLeague.name.split(' ')[selectedLeague.name.split(' ').length - 1].toUpperCase()}`
              : 'Welcome to FutHub Fantasy Football'}
          </h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* League Setup Screen */}
          {showLeagueSetup && currentLeague && (
            <div className="max-w-7xl mx-auto">
              <button 
                onClick={handleBack}
                className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                ← Back to Invite Friends
              </button>

              {/* Tab Navigation */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg mb-6 overflow-x-auto">
                <div className="flex">
                  {setupTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition ${
                        activeTab === tab.id
                          ? 'bg-slate-700 text-white border-b-2 border-blue-500'
                          : 'text-slate-400 hover:text-white hover:bg-slate-750'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 min-h-96">
                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">General Settings</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}
                
                {activeTab === 'teams' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Teams and Schedules</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}
                
                {activeTab === 'pool' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Player Pool</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}
                
                {activeTab === 'rosters' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Rosters</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}
                
                {activeTab === 'scoring' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Scoring</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}
                
                {activeTab === 'transactions' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Transactions and Periods</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}
                
                {activeTab === 'draft' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Draft</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}
                
                {activeTab === 'misc' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Miscellaneous</h2>
                    <p className="text-slate-400">Content coming soon...</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700">
                  <button
                    onClick={handleSaveSettings}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded font-medium transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleSaveAndContinue}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition"
                  >
                    Save and Continue
                  </button>
                  <button
                    onClick={handleSubmitSettings}
                    disabled={!allTabsCompleted}
                    className={`px-6 py-2 rounded font-medium transition ${
                      allTabsCompleted
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Invite Friends Screen */}
          {currentLeague && !showLeagueSetup && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">Invite Friends</h2>
              <p className="text-slate-400 mb-8">
                {currentLeague.createdAt.split('T')[0]} {currentLeague.competitionName} {currentLeague.leagueName}
              </p>

              {/* Success Banner */}
              <div className="bg-green-900 border border-green-700 rounded-lg p-4 mb-8 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-semibold">Congratulations!</h3>
                  <p className="text-sm text-green-100">
                    Your {currentLeague.competitionName} {currentLeague.leagueName} league has been created.
                  </p>
                </div>
              </div>

              {/* Share Options */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {/* Email Invite */}
                  <button
                    onClick={handleEmailInvite}
                    className="flex flex-col items-center gap-4 p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                  >
                    <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">📧</span>
                    </div>
                    <span className="font-semibold">Email Invite</span>
                  </button>

                  {/* Copy Invite Link */}
                  <button
                    onClick={handleCopyInviteLink}
                    className="flex flex-col items-center gap-4 p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                  >
                    <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <span className="font-semibold">Copy Invite link</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleLeagueSetup}
                  className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <span>⚙️</span>
                  <span>League Setup</span>
                </button>
                <button
                  onClick={handleLeagueHome}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <span>🏠</span>
                  <span>League Home</span>
                </button>
              </div>
            </div>
          )}

          {!selectedLeague && !showCreateLeague && !currentLeague && !showLeagueSetup && (
            <>
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
                  {competitions.map((league) => (
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
              </div>
            </>
          )}

          {/* Create or Join League Options */}
          {selectedLeague && !showCreateLeague && !currentLeague && !showLeagueSetup && (
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={handleBack}
                className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                ← Back to league selection
              </button>

              <h2 className="text-2xl font-bold mb-2">
                {selectedLeague.name}
              </h2>
              <p className="text-slate-400 mb-8">Choose an option to get started</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Create League Card */}
                <button
                  onClick={handleCreateLeague}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-8 transition text-left group"
                >
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
                    Create League
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Start a new fantasy league and invite your friends to compete
                  </p>
                </button>

                {/* Join League Card */}
                <button
                  onClick={handleJoinLeague}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-8 transition text-left group"
                >
                  <div className="text-5xl mb-4">👥</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
                    Join League
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Enter a league code to join an existing fantasy league
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Create League Flow */}
          {showCreateLeague && !currentLeague && !showLeagueSetup && (
            <div className="max-w-5xl mx-auto">
              <button 
                onClick={handleBack}
                className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                ← Back
              </button>

              {/* Progress Steps */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-lg opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">1</div>
                  <div className="text-sm">
                    <div className="font-semibold">Step 1</div>
                    <div className="text-slate-400 text-xs">What do you want to do?</div>
                  </div>
                </div>

                <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentStep === 2 ? 'bg-green-900 border border-green-700' : 'bg-slate-800'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === 2 ? 'bg-green-700' : 'bg-slate-700'}`}>2</div>
                  <div className="text-sm">
                    <div className="font-semibold">Step 2</div>
                    <div className="text-slate-400 text-xs">Choose league type</div>
                  </div>
                </div>

                <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentStep === 3 ? 'bg-green-900 border border-green-700' : 'bg-slate-800'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === 3 ? 'bg-green-700' : 'bg-slate-700'}`}>3</div>
                  <div className="text-sm">
                    <div className="font-semibold">Step 3</div>
                    <div className="text-slate-400 text-xs">Enter basic settings</div>
                  </div>
                </div>
              </div>

              {/* Step 2: Choose League Type */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Choose your league type</h2>
                  
                  <div className="grid grid-cols-1 gap-6 max-w-2xl">
                    {/* H2H - Points */}
                    <button
                      onClick={() => handleSelectLeagueType('H2H - Points')}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-6 transition text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">👥</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
                            H2H - Points
                          </h3>
                          <p className="text-slate-400 text-sm mb-4">
                            Fantasy teams compete against each other 1-on-1 and receive a Win, Loss or Tie in each 
                            Scoring Period, depending on who has the most Fantasy points.
                          </p>
                          <button className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-sm font-medium transition">
                            Go
                          </button>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Enter Basic Settings */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Enter basic settings</h2>
                  
                  <form onSubmit={handleCreateLeagueSubmit} className="max-w-2xl space-y-6">
                    {/* League Name */}
                    <div>
                      <label htmlFor="leagueName" className="block text-sm font-medium mb-2">
                        League Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="leagueName"
                        name="leagueName"
                        value={leagueData.leagueName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter league name"
                        required
                      />
                    </div>

                    {/* Team Name */}
                    <div>
                      <label htmlFor="teamName" className="block text-sm font-medium mb-2">
                        Team Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={leagueData.teamName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your team name"
                        required
                      />
                    </div>

                    {/* League Format */}
                    <div>
                      <label htmlFor="leagueFormat" className="block text-sm font-medium mb-2">
                        League Format
                      </label>
                      <select
                        id="leagueFormat"
                        name="leagueFormat"
                        value={leagueData.leagueFormat}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Redraft">Redraft</option>
                      </select>
                    </div>

                    {/* Draft Type */}
                    <div>
                      <label htmlFor="draftType" className="block text-sm font-medium mb-2">
                        Draft Type
                      </label>
                      <select
                        id="draftType"
                        name="draftType"
                        value={leagueData.draftType}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Live Online Standard">Live Online Standard</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-green-700 hover:bg-green-600 text-white py-3 px-6 rounded font-medium transition"
                      >
                        Create League
                      </button>
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded font-medium transition"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 px-8 py-4 text-center text-slate-400 text-sm">
          <p>FutHub Fantasy Football - Milestone 1: League Creation ✅</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
