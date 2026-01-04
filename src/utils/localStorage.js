const LEAGUES_KEY = 'fantasyApp_leagues';

export const saveLeagues = (leagues) => {
  try {
    localStorage.setItem(LEAGUES_KEY, JSON.stringify(leagues));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLeagues = () => {
  try {
    const leagues = localStorage.getItem(LEAGUES_KEY);
    return leagues ? JSON.parse(leagues) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

