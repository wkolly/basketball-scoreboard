import axios from 'axios';
import { SportsApiResponse, NewsItem } from '../types';

const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY || 'your-api-key-here';
// The BASE_URL remains the same
const BASE_URL = 'https://nba-api-free-data.p.rapidapi.com/nba-scoreboard-by-date?date=202504';

const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'nba-api-free-data.p.rapidapi.com'
};

export const getLiveGames = async (): Promise<SportsApiResponse> => {
  try {
    const response = await axios.get(BASE_URL, {
      headers,
      params: { live: 'all' }
    });

    console.log('Full response data:', JSON.stringify(response.data, null, 2));

    // Notice the property name is "Events" (capital E)
    const events = response.data?.response?.Events;
    if (!Array.isArray(events)) {
      throw new Error('No events array found in response');
    }

    const games = events
      .map((event: any) => {
        // competitions is an object now, not an array
        const competition = event.competitions;
        if (!competition) return null;

        // Find home and away teams inside competition.competitors
        const homeTeamData = competition.competitors.find((c: any) => c.homeAway === 'home');
        const awayTeamData = competition.competitors.find((c: any) => c.homeAway === 'away');

        return {
          id: event.id,
          homeTeam: {
            name: homeTeamData?.team?.name ?? 'Unknown Home',
            score: parseInt(homeTeamData?.score, 10) || 0
          },
          awayTeam: {
            name: awayTeamData?.team?.name ?? 'Unknown Away',
            score: parseInt(awayTeamData?.score, 10) || 0
          },
          // The event-level "status" contains game status info
          status: event.status?.type?.description ?? 'Unknown',
          period: event.status?.period ?? 0,
          clock: event.status?.displayClock ?? '0.0'
        };
      })
      .filter((game): game is Exclude<typeof game, null> => game !== null);

    return { games };
  } catch (error) {
    console.error('Error fetching live games:', error);
    return getMockGames(); // Fall back to mock data on error
  }
};

// Get basketball news (returns mock data for now)
export const getBasketballNews = async (): Promise<NewsItem[]> => {
  try {
    return getMockGames().news || [];
  } catch (error) {
    console.error('Error fetching basketball news:', error);
    return [];
  }
};

// Fallback mock data
export const getMockGames = (): SportsApiResponse => ({
  games: [
    {
      id: '1',
      homeTeam: { name: 'Lakers', score: 105 },
      awayTeam: { name: 'Celtics', score: 98 },
      status: 'In Progress',
      period: 4,
      clock: '2:45'
    },
    {
      id: '2',
      homeTeam: { name: 'Warriors', score: 87 },
      awayTeam: { name: 'Nets', score: 82 },
      status: 'In Progress',
      period: 3,
      clock: '5:30'
    },
    {
      id: '3',
      homeTeam: { name: 'Bucks', score: 112 },
      awayTeam: { name: 'Heat', score: 104 },
      status: 'Finished'
    }
  ],
  news: [
    {
      id: '1',
      text: 'James records triple-double in Lakers victory',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      text: 'Curry scores 40 points against Brooklyn',
      timestamp: new Date().toISOString()
    },
    {
      id: '3',
      text: 'NBA Finals set to begin next week',
      timestamp: new Date().toISOString()
    }
  ]
});
