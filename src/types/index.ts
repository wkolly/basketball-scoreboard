// Team interface
export interface Team {
    id: string;
    name: string;
    logo?: string;
    score: number;
    fouls: number;
    timeouts: number;
    hasPossession: boolean;
  }
  
  // Player interface
  export interface Player {
    id: string;
    name: string;
    number: number;
    fouls: number;
    teamId: string;
  }
  
  // Game clock interface
  export interface GameClock {
    minutes: number;
    seconds: number;
    tenths: number; // For the last minute
    isRunning: boolean;
  }
  
  // Period interface
  export interface GamePeriod {
    current: number;
    total: number;
  }
  
  // Game state interface
  export interface GameState {
    homeTeam: Team;
    awayTeam: Team;
    clock: GameClock;
    period: GamePeriod;
    players: Player[];
  }
  
  // News item interface for the ticker
  export interface NewsItem {
    id: string;
    text: string;
    timestamp: string;
  }
  
  // API response interface
  export interface SportsApiResponse {
    games?: {
      id: string;
      homeTeam: {
        name: string;
        score: number;
      };
      awayTeam: {
        name: string;
        score: number;
      };
      status: string;
      period?: number;
      clock?: string;
    }[];
    news?: NewsItem[];
    error?: string;
  }