import React, { useEffect, useState } from 'react';
import { getLiveGames, getBasketballNews, getMockGames } from '../../services/sportsApi';
import { NewsItem } from '../../types';

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [games, setGames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Attempt to fetch live games from API
        const liveGamesResponse = await getLiveGames();
        
        if (liveGamesResponse.games && liveGamesResponse.games.length > 0) {
          // Format the live games data
          const gameStrings = liveGamesResponse.games.map(game => 
            `${game.homeTeam.name} ${game.homeTeam.score} - ${game.awayTeam.name} ${game.awayTeam.score} ${game.status}`
          );
          setGames(gameStrings);
        } else {
          // Fall back to mock data if no live games available
          const mockData = getMockGames();
          if (mockData.games) {
            const gameStrings = mockData.games.map(game => 
              `${game.homeTeam.name} ${game.homeTeam.score} - ${game.awayTeam.name} ${game.awayTeam.score} ${game.status === 'Finished' ? 'FINAL' : game.status}`
            );
            setGames(gameStrings);
          }
        }
        
        // Fetch news
        const newsItems = await getBasketballNews();
        setNews(newsItems);
      } catch (error) {
        console.error('Error fetching data:', error);
        // If API fails, use mock data
        const mockData = getMockGames();
        if (mockData.games) {
          const gameStrings = mockData.games.map(game => 
            `${game.homeTeam.name} ${game.homeTeam.score} - ${game.awayTeam.name} ${game.awayTeam.score} ${game.status === 'Finished' ? 'FINAL' : game.status}`
          );
          setGames(gameStrings);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchData, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Combine news and game scores for the ticker
  const tickerItems = [
    ...games.map(game => ({ id: `game-${game}`, text: game })),
    ...news.map(item => ({ id: item.id, text: item.text })),
  ];
  
  if (isLoading && tickerItems.length === 0) {
    return (
      <div className="ticker-container">
        <div className="text-center">Loading scores and news...</div>
      </div>
    );
  }
  
  return (
    <div className="ticker-container" style={{ 
      backgroundColor: "#000", 
      borderRadius: "4px", 
      padding: "10px", 
      color: "#ffcc00",  
      overflow: "hidden"
    }}>
      <div className="ticker-wrap">
        <div className="ticker" style={{ animation: "scroll 30s linear infinite" }}>
          {tickerItems.map((item) => (
            <span key={item.id} className="ticker-item" style={{ marginRight: "40px" }}>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;