// API service layer for player management
// Update BASE_URL to match your backend endpoint

const BASE_URL = 'http://localhost:9090/api/v1'; // Update this to your actual backend URL

export interface Player {
  name: string;
  nation: string;
  position: string;
  team: string;
  age: number;
  born: string;
  played: number;
  starts: number;
  minutes: number;
  goals: number;
  assists: number;
  penalty_kicks: number;
  penalty_kicks_attempts: number;
  yellow: number;
  red: number;
  expected_goals: number;
  progressive_carries: number;
  progressive_passes: number;
  received_progressive_passes: number;
}

export interface PlayerFilters {
  team?: string;
  name?: string;
  position?: string;
  nation?: string;
}

// Fetch players with optional filters
export const getPlayers = async (filters?: PlayerFilters): Promise<Player[]> => {
  const params = new URLSearchParams();
  if (filters?.team) params.append('team', filters.team);
  if (filters?.name) params.append('name', filters.name);
  if (filters?.position) params.append('position', filters.position);
  if (filters?.nation) params.append('nation', filters.nation);

  const url = `${BASE_URL}/player${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }
  
  return response.json();
};

// Add a new player
export const addPlayer = async (player: Player): Promise<Player> => {
  const response = await fetch(`${BASE_URL}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });

  if (!response.ok) {
    throw new Error('Failed to add player');
  }

  return response.json();
};

// Update an existing player
export const updatePlayer = async (player: Player): Promise<Player> => {
  const response = await fetch(`${BASE_URL}/player`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });

  if (!response.ok) {
    throw new Error('Failed to update player');
  }

  return response.json();
};

// Delete a player by name
export const deletePlayer = async (playerName: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/player/${encodeURIComponent(playerName)}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete player');
  }
};

// Get player statistics
export const getPlayerStats = async () => {
  const players = await getPlayers();
  
  const totalPlayers = players.length;
  const playersByTeam = players.reduce((acc, player) => {
    acc[player.team] = (acc[player.team] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topScorers = [...players]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);
  
  const topAssists = [...players]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 10);

  return {
    totalPlayers,
    playersByTeam,
    topScorers,
    topAssists,
  };
};
