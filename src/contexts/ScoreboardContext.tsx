import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { GameState } from "../types";

// Define action types
type ActionType =
  | { type: "UPDATE_SCORE"; teamId: string; points: number }
  | { type: "UPDATE_FOULS"; teamId: string; value: number }
  | { type: "UPDATE_TIMEOUTS"; teamId: string; value: number }
  | { type: "TOGGLE_POSSESSION"; teamId: string }
  | { type: "UPDATE_PLAYER_FOULS"; playerId: string; fouls: number }
  | { type: "START_CLOCK" }
  | { type: "STOP_CLOCK" }
  | { type: "RESET_CLOCK"; minutes: number; seconds: number }
  | { type: "TICK_CLOCK"; source?: string }  // Added optional source parameter
  | { type: "UPDATE_PERIOD"; value: number }
  | { type: "RESET_GAME" }
  | { type: "UPDATE_TEAM_NAME"; teamId: string; name: string }
  | { type: "SET_GAME_STATE"; state: GameState };

// Define context type
interface ScoreboardContextType {
  state: GameState;
  dispatch: React.Dispatch<ActionType>;
}

// Create context
const ScoreboardContext = createContext<ScoreboardContextType | undefined>(
  undefined
);

// Initial state
const initialState: GameState = {
  homeTeam: {
    id: "home",
    name: "HOME",
    score: 0,
    fouls: 0,
    timeouts: 4,
    hasPossession: false,
  },
  awayTeam: {
    id: "away",
    name: "AWAY",
    score: 0,
    fouls: 0,
    timeouts: 4,
    hasPossession: false,
  },
  clock: {
    minutes: 12,
    seconds: 0,
    tenths: 0,
    isRunning: false,
  },
  period: {
    current: 1,
    total: 4,
  },
  players: [],
};

// Create reducer function
function scoreboardReducer(state: GameState, action: ActionType): GameState {
  switch (action.type) {
    case "UPDATE_SCORE":
      if (action.teamId === "home") {
        return {
          ...state,
          homeTeam: {
            ...state.homeTeam,
            score: Math.max(0, state.homeTeam.score + action.points),
          },
        };
      } else {
        return {
          ...state,
          awayTeam: {
            ...state.awayTeam,
            score: Math.max(0, state.awayTeam.score + action.points),
          },
        };
      }

    case "UPDATE_FOULS":
      if (action.teamId === "home") {
        return {
          ...state,
          homeTeam: {
            ...state.homeTeam,
            fouls: Math.max(0, state.homeTeam.fouls + action.value),
          },
        };
      } else {
        return {
          ...state,
          awayTeam: {
            ...state.awayTeam,
            fouls: Math.max(0, state.awayTeam.fouls + action.value),
          },
        };
      }

    case "UPDATE_TIMEOUTS":
      if (action.teamId === "home") {
        return {
          ...state,
          homeTeam: {
            ...state.homeTeam,
            timeouts: Math.max(
              0,
              Math.min(5, state.homeTeam.timeouts + action.value)
            ),
          },
        };
      } else {
        return {
          ...state,
          awayTeam: {
            ...state.awayTeam,
            timeouts: Math.max(
              0,
              Math.min(5, state.awayTeam.timeouts + action.value)
            ),
          },
        };
      }

    case "TOGGLE_POSSESSION":
      return {
        ...state,
        homeTeam: {
          ...state.homeTeam,
          hasPossession: action.teamId === "home",
        },
        awayTeam: {
          ...state.awayTeam,
          hasPossession: action.teamId === "away",
        },
      };

    case "UPDATE_PLAYER_FOULS":
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.playerId
            ? { ...player, fouls: action.fouls }
            : player
        ),
      };

    case "START_CLOCK":
      return {
        ...state,
        clock: {
          ...state.clock,
          isRunning: true,
        },
      };

    case "STOP_CLOCK":
      return {
        ...state,
        clock: {
          ...state.clock,
          isRunning: false,
        },
      };

    case "RESET_CLOCK":
      return {
        ...state,
        clock: {
          ...state.clock,
          minutes: action.minutes,
          seconds: action.seconds,
          tenths: 0,
          isRunning: false,
        },
      };

    case "TICK_CLOCK": {
      let { minutes, seconds, tenths } = state.clock;

      // Only track tenths when we're in the last minute
      if (minutes === 0) {
        tenths = tenths - 1;
        if (tenths < 0) {
          tenths = 9;
          seconds = seconds - 1;
        }
      } else {
        seconds = seconds - 1;
      }

      if (seconds < 0) {
        seconds = 59;
        minutes = minutes - 1;
      }

      // Check if clock has reached zero
      if (minutes === 0 && seconds === 0 && tenths === 0) {
        return {
          ...state,
          clock: {
            minutes: 0,
            seconds: 0,
            tenths: 0,
            isRunning: false,
          },
        };
      }

      return {
        ...state,
        clock: {
          ...state.clock,
          minutes,
          seconds,
          tenths,
        },
      };
    }

    case "UPDATE_PERIOD":
      return {
        ...state,
        period: {
          ...state.period,
          current: Math.max(
            1,
            Math.min(state.period.total, state.period.current + action.value)
          ),
        },
      };

    case "RESET_GAME":
      return {
        ...initialState,
        homeTeam: {
          ...initialState.homeTeam,
          name: state.homeTeam.name,
        },
        awayTeam: {
          ...initialState.awayTeam,
          name: state.awayTeam.name,
        },
      };

    case "UPDATE_TEAM_NAME":
      if (action.teamId === "home") {
        return {
          ...state,
          homeTeam: {
            ...state.homeTeam,
            name: action.name,
          },
        };
      } else {
        return {
          ...state,
          awayTeam: {
            ...state.awayTeam,
            name: action.name,
          },
        };
      }

    case "SET_GAME_STATE":
      return action.state;

    default:
      return state;
  }
}

// Create provider component
interface ScoreboardProviderProps {
  children: ReactNode;
}

export const ScoreboardProvider: React.FC<ScoreboardProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(scoreboardReducer, initialState);

  return (
    <ScoreboardContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreboardContext.Provider>
  );
};

// Custom hook to use scoreboard context
export const useScoreboard = (): ScoreboardContextType => {
  const context = useContext(ScoreboardContext);
  if (context === undefined) {
    throw new Error("useScoreboard must be used within a ScoreboardProvider");
  }
  return context;
};
