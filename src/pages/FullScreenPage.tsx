import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreboardDisplay from '../components/scoreboard/ScoreboardDisplay';

const FullScreenPage: React.FC = () => {
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = 'Basketball Scoreboard - Full Screen Mode';
    
    // Request fullscreen if possible
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
    
    // Exit fullscreen when leaving this page
    return () => {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit full-screen mode: ${err.message}`);
        });
      }
    };
  }, []);

  const handleExitFullScreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit full-screen mode: ${err.message}`);
      });
    }
    navigate('/');
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#111827",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 50,
      padding: "20px"
    }}>
      <button 
        onClick={handleExitFullScreen}
        aria-label="Exit Full Screen"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
          opacity: 0.7,
          transition: "opacity 0.3s"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = "0.7";
        }}
      >
        X
      </button>
      <div style={{ width: "100%", maxWidth: "1400px" }}>
        <ScoreboardDisplay />
      </div>
    </div>
  );
};

export default FullScreenPage;