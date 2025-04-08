import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ScoreboardProvider } from './contexts/ScoreboardContext';
import ScoreboardPage from './pages/ScoreboardPage';
import ControlPanelPage from './pages/ControlPanelPage';
import FullScreenPage from './pages/FullScreenPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <ScoreboardProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-scoreboard-background text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Basketball Scoreboard</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link 
                      to="/" 
                      className="hover:text-scoreboard-accent transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/control" 
                      className="hover:text-scoreboard-accent transition-colors"
                    >
                      Control Panel
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/fullscreen" 
                      className="hover:text-scoreboard-accent transition-colors"
                    >
                      Full Screen
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ScoreboardPage />} />
              <Route path="/control" element={<ControlPanelPage />} />
              <Route path="/fullscreen" element={<FullScreenPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-800 text-white p-4 mt-auto">
            <div className="container mx-auto text-center">
              <p>IS 542 Basketball Scoreboard Project</p>
            </div>
          </footer>
        </div>
      </Router>
    </ScoreboardProvider>
  );
}

export default App;