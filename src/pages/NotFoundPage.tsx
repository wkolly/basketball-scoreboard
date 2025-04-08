import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Basketball Scoreboard - Page Not Found';
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ 
        fontSize: "72px", 
        fontWeight: "bold", 
        color: "#e74c3c", 
        marginBottom: "16px" 
      }}>404</h1>
      
      <h2 style={{ 
        fontSize: "32px", 
        fontWeight: "bold", 
        marginBottom: "16px",
        color: "#333"
      }}>Page Not Found</h2>
      
      <p style={{ 
        color: "#666", 
        marginBottom: "32px", 
        maxWidth: "500px",
        fontSize: "16px",
        lineHeight: "1.5"
      }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link
        to="/"
        style={{
          padding: "12px 24px",
          backgroundColor: "#3498db",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          transition: "background-color 0.2s"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#2980b9";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#3498db";
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;