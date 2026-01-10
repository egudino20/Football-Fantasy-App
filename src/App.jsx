import { useState, useEffect } from 'react';
import { saveLeagues, getLeagues } from './utils/localStorage';

function App() {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showCreateLeague, setShowCreateLeague] = useState(false);
  const [currentStep, setCurrentStep] = useState(2); // Start at step 2 (league type)
  const [currentLeague, setCurrentLeague] = useState(null); // Currently viewing league
  const [showLeagueSetup, setShowLeagueSetup] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [activeSubTab, setActiveSubTab] = useState('teams'); // For Teams and Schedules sub-tabs
  const [completedTabs, setCompletedTabs] = useState(new Set());
  const [leagueSettings, setLeagueSettings] = useState({});
  const [generalSettings, setGeneralSettings] = useState({
    leagueName: '',
  });
  const [teamsSettings, setTeamsSettings] = useState({
    maxTeams: 10,
    teams: [],
  });
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

  const teamsSubTabs = [
    { id: 'teams', name: 'Teams' },
    { id: 'schedule', name: 'Schedule' },
    { id: 'playoffs', name: 'Playoffs' },
    { id: 'matchups', name: 'Matchups' },
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

  const generateJoinCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleCreateLeagueSubmit = (e) => {
    e.preventDefault();
    
    if (!leagueData.leagueName || !leagueData.teamName) {
      alert('Please fill in all required fields');
      return;
    }

    const joinId = generateJoinCode();
    const joinPassword = generatePassword();

    const newLeague = {
      id: Date.now().toString(),
      competition: selectedLeague.id,
      competitionName: selectedLeague.name,
      joinId: joinId,
      joinPassword: joinPassword,
      joinUrl: `${window.location.origin}/join/${joinId}`,
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
    setActiveSubTab('teams');
    // Initialize general settings with current league data
    if (currentLeague) {
      setGeneralSettings({
        leagueName: currentLeague.leagueName,
      });
      // Initialize teams with commissioner
      setTeamsSettings({
        maxTeams: currentLeague.settings?.teams?.maxTeams || 10,
        teams: currentLeague.settings?.teams?.teams || [
          {
            id: 'commissioner',
            teamName: currentLeague.teamName,
            teamAbbreviation: currentLeague.teamName.substring(0, 4).toUpperCase(),
            managerEmail: 'commissioner@league.com', // Placeholder until auth is implemented
            invitationSent: true,
            joinedLeague: true,
            isCommissioner: true,
          }
        ],
      });
    }
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
    
    // Add tab-specific settings
    if (activeTab === 'teams') {
      updatedSettings.teams = teamsSettings;
    }
    
    setLeagueSettings(updatedSettings);
    
    // Update the league in localStorage
    if (currentLeague) {
      let updatedLeague = { ...currentLeague, settings: updatedSettings };
      
      // Save general settings to league
      if (activeTab === 'general') {
        updatedLeague = { ...updatedLeague, leagueName: generalSettings.leagueName };
      }
      
      const updatedLeagues = createdLeagues.map(league => 
        league.id === currentLeague.id ? updatedLeague : league
      );
      setCreatedLeagues(updatedLeagues);
      saveLeagues(updatedLeagues);
      setCurrentLeague(updatedLeague);
    }
    
    alert(`${setupTabs.find(t => t.id === activeTab)?.name} settings saved!`);
  };

  const handleSaveAndContinue = () => {
    // Validate required fields before saving
    if (activeTab === 'general' && !generalSettings.leagueName.trim()) {
      alert('Please fill in all required fields (marked with *)');
      return;
    }
    
    // Save current tab
    handleSaveSettings();
    
    // Move to next tab
    const currentIndex = setupTabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < setupTabs.length - 1) {
      setActiveTab(setupTabs[currentIndex + 1].id);
    }
  };

  const isCurrentTabValid = () => {
    if (activeTab === 'general') {
      return generalSettings.leagueName.trim() !== '';
    }
    // Other tabs don't have required fields yet
    return true;
  };

  const handleSubmitSettings = () => {
    // TODO: In future, this will submit all settings to backend
    alert('All league settings submitted successfully! League is now fully configured.');
    setShowLeagueSetup(false);
  };

  const handleAddTeam = () => {
    const newTeam = {
      id: Date.now().toString(),
      teamName: '',
      teamAbbreviation: '',
      managerEmail: '',
      invitationSent: false,
      joinedLeague: false,
      isCommissioner: false,
    };
    setTeamsSettings({
      ...teamsSettings,
      teams: [...teamsSettings.teams, newTeam],
    });
  };

  const handleRemoveTeam = (teamId) => {
    setTeamsSettings({
      ...teamsSettings,
      teams: teamsSettings.teams.filter(team => team.id !== teamId),
    });
  };

  const handleTeamChange = (teamId, field, value) => {
    setTeamsSettings({
      ...teamsSettings,
      teams: teamsSettings.teams.map(team =>
        team.id === teamId ? { ...team, [field]: value } : team
      ),
    });
  };

  const handleSendInvitations = () => {
    // Mark all teams with emails as invitation sent
    const updatedTeams = teamsSettings.teams.map(team => {
      if (team.managerEmail && !team.invitationSent && !team.isCommissioner) {
        // TODO: Backend API call to send email invitation
        return { ...team, invitationSent: true };
      }
      return team;
    });
    
    setTeamsSettings({ ...teamsSettings, teams: updatedTeams });
    
    // Also save the settings
    handleSaveSettings();
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
                {/* Required Fields Indicator */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1"></div>
                  <p className="text-xs text-slate-400">
                    <span className="text-red-400">*</span> Required Fields
                  </p>
                </div>

                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">General Settings</h2>
                    
                    <div className="space-y-6 max-w-2xl">
                      {/* League Name */}
                      <div>
                        <label htmlFor="leagueName" className="block text-sm font-medium mb-2">
                          League Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="leagueName"
                          value={generalSettings.leagueName}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, leagueName: e.target.value })}
                          className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                          placeholder="Enter league name"
                          required
                        />
                      </div>

                      {/* League Join ID */}
                      <div>
                        <label htmlFor="joinId" className="block text-sm font-medium mb-2">
                          League Join ID
                        </label>
                        <input
                          type="text"
                          id="joinId"
                          value={currentLeague?.joinId || ''}
                          readOnly
                          className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-slate-400 cursor-not-allowed"
                        />
                        <p className="text-xs text-slate-400 mt-1">This ID is automatically generated and cannot be changed.</p>
                      </div>

                      {/* League Password */}
                      <div>
                        <label htmlFor="joinPassword" className="block text-sm font-medium mb-2">
                          League Password
                        </label>
                        <input
                          type="text"
                          id="joinPassword"
                          value={currentLeague?.joinPassword || ''}
                          readOnly
                          className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-slate-400 cursor-not-allowed"
                        />
                        <p className="text-xs text-slate-400 mt-1">This password is automatically generated and cannot be changed.</p>
                      </div>

                      {/* League Join URL */}
                      <div>
                        <label htmlFor="joinUrl" className="block text-sm font-medium mb-2">
                          League Join URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="joinUrl"
                            value={currentLeague?.joinUrl || ''}
                            readOnly
                            className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-slate-300"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(currentLeague?.joinUrl || '');
                              alert('Join URL copied to clipboard!');
                            }}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Anyone with this link can join the league (must be logged in).</p>
                      </div>

                      {/* Scoring System */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Scoring System
                        </label>
                        <div className="bg-slate-700 border border-slate-600 rounded p-4">
                          <div className="font-semibold mb-2">
                            Scoring Type: Head-to-Head (Points-Based)
                          </div>
                          <p className="text-sm text-slate-300">
                            Each team competes directly against another team each Scoring Period (typically one week). 
                            Teams accumulate points using the standard Points-Based scoring system. At the end of each 
                            Scoring Period, the team with the most points records a win, and the opponent records a loss. 
                            Support multiple matchups per scoring period. At the end of the season, standings are 
                            determined by win–loss record.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'teams' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Teams and Schedules</h2>
                    
                    {/* Sub-tabs */}
                    <div className="bg-slate-700 rounded-lg mb-6 p-1 flex gap-1">
                      {teamsSubTabs.map((subTab) => (
                        <button
                          key={subTab.id}
                          onClick={() => setActiveSubTab(subTab.id)}
                          className={`flex-1 px-4 py-2 text-sm font-medium rounded transition ${
                            activeSubTab === subTab.id
                              ? 'bg-slate-600 text-white'
                              : 'text-slate-300 hover:text-white hover:bg-slate-650'
                          }`}
                        >
                          {subTab.name}
                        </button>
                      ))}
                    </div>

                    {/* Sub-tab Content */}
                    <div className="space-y-6">
                      {activeSubTab === 'teams' && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Teams Configuration</h3>
                          
                          {/* Information Section */}
                          <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 mb-6 space-y-2 text-sm">
                            <p className="text-slate-300">
                              <strong>To invite by email:</strong> Enter their email addresses in the Manager Email column below and click 
                              "Send Email Invitations & Save" above. You can enter a team name as well. A team will automatically be created, 
                              whether or not it has a manager.
                            </p>
                            <p className="text-slate-300">
                              <strong>Teams can also join your league (without creating invites) as follows:</strong>
                            </p>
                            <div className="flex items-center gap-2 bg-slate-800 p-3 rounded">
                              <span className="text-slate-400">Copy & paste this link to anyone and they simply click on it to join:</span>
                              <input
                                type="text"
                                value={currentLeague?.joinUrl || ''}
                                readOnly
                                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-slate-300"
                              />
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(currentLeague?.joinUrl || '');
                                  alert('Join link copied!');
                                }}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition"
                              >
                                Copy
                              </button>
                            </div>
                            <p className="text-slate-300">• Members can only own one team</p>
                            <p className="text-slate-300">• Fantasy teams remain in league if a manager quits the league</p>
                            <div className="flex items-center gap-2">
                              <label className="text-slate-300 font-medium">Maximum number of teams in league:</label>
                              <select
                                value={teamsSettings.maxTeams}
                                onChange={(e) => setTeamsSettings({ ...teamsSettings, maxTeams: parseInt(e.target.value) })}
                                className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-sm"
                              >
                                {[4, 6, 8, 10, 12, 14, 16, 18, 20].map(num => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Send Invitations Button */}
                          <div className="mb-4 flex gap-3">
                            <button
                              onClick={handleAddTeam}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition"
                            >
                              Add Team
                            </button>
                            <button
                              onClick={handleSendInvitations}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition"
                            >
                              Send Email Invitations & Save
                            </button>
                          </div>

                          {/* Teams Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full border border-slate-600">
                              <thead>
                                <tr className="bg-slate-700">
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-left">Add Owner</th>
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-left">Team Name</th>
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-left">Team Abbreviation</th>
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-left">Manager Email</th>
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-center">Invitation Sent</th>
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-center">Joined League</th>
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-center">Send Invitation</th>
                                  <th className="border border-slate-600 px-3 py-2 text-sm font-semibold text-center">Remove</th>
                                </tr>
                              </thead>
                              <tbody>
                                {teamsSettings.teams.map((team, index) => (
                                  <tr key={team.id} className={team.isCommissioner ? 'bg-yellow-900 bg-opacity-20' : index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-750'}>
                                    <td className="border border-slate-600 px-3 py-2 text-center">
                                      {team.isCommissioner && (
                                        <span className="text-sm font-semibold text-yellow-400">Commissioner</span>
                                      )}
                                    </td>
                                    <td className="border border-slate-600 px-3 py-2">
                                      <input
                                        type="text"
                                        value={team.teamName}
                                        onChange={(e) => handleTeamChange(team.id, 'teamName', e.target.value)}
                                        disabled={team.isCommissioner}
                                        className={`w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm ${
                                          team.isCommissioner ? 'bg-yellow-900 bg-opacity-20 cursor-not-allowed' : ''
                                        }`}
                                        placeholder="Team name"
                                      />
                                    </td>
                                    <td className="border border-slate-600 px-3 py-2">
                                      <input
                                        type="text"
                                        value={team.teamAbbreviation}
                                        onChange={(e) => handleTeamChange(team.id, 'teamAbbreviation', e.target.value)}
                                        disabled={team.isCommissioner}
                                        maxLength={4}
                                        className={`w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm ${
                                          team.isCommissioner ? 'bg-yellow-900 bg-opacity-20 cursor-not-allowed' : ''
                                        }`}
                                        placeholder="ABBR"
                                      />
                                    </td>
                                    <td className="border border-slate-600 px-3 py-2">
                                      <input
                                        type="email"
                                        value={team.managerEmail}
                                        onChange={(e) => handleTeamChange(team.id, 'managerEmail', e.target.value)}
                                        disabled={team.isCommissioner}
                                        className={`w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm ${
                                          team.isCommissioner ? 'bg-yellow-900 bg-opacity-20 cursor-not-allowed' : ''
                                        }`}
                                        placeholder="email@example.com"
                                      />
                                    </td>
                                    <td className="border border-slate-600 px-3 py-2 text-center text-sm">
                                      {team.invitationSent ? 'Yes' : 'No'}
                                    </td>
                                    <td className="border border-slate-600 px-3 py-2 text-center text-sm">
                                      {team.joinedLeague ? 'Yes' : 'No'}
                                    </td>
                                    <td className="border border-slate-600 px-3 py-2 text-center">
                                      <input
                                        type="checkbox"
                                        checked={team.invitationSent}
                                        disabled
                                        className="w-4 h-4 cursor-not-allowed"
                                      />
                                    </td>
                                    <td className="border border-slate-600 px-3 py-2 text-center">
                                      {!team.isCommissioner && (
                                        <button
                                          onClick={() => handleRemoveTeam(team.id)}
                                          className="text-red-500 hover:text-red-400 text-xl font-bold transition"
                                        >
                                          ✕
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {activeSubTab === 'schedule' && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Schedule Configuration</h3>
                          <p className="text-slate-400">Content coming soon...</p>
                        </div>
                      )}
                      
                      {activeSubTab === 'playoffs' && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Playoffs Configuration</h3>
                          <p className="text-slate-400">Content coming soon...</p>
                        </div>
                      )}
                      
                      {activeSubTab === 'matchups' && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Matchups Configuration</h3>
                          <p className="text-slate-400">Content coming soon...</p>
                        </div>
                      )}
                    </div>
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
                    disabled={!isCurrentTabValid()}
                    className={`px-6 py-2 rounded font-medium transition ${
                      isCurrentTabValid()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
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
