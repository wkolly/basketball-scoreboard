Basketball Scoreboard

This is my basketball scoreboard web application built for the IS 542 Semester Project. It simulates a real gymn scoreboard with controls for keeping track of basketball game stats, time, and scores.
Project Description
I built a digital basketball scoreboard that looks like the ones you'd see in a high school or college gym. The app has two main parts - the scoreboard display and a control panel. The scoreboard shows team scores, the game clock, quarter/period, fouls, timeouts, and possession. I also added a news ticker at the bottom that pulls in live basketball scores from an API.
The app is built with React and TypeScript. I used the Rapid NBA API for state management to keep track of all the game data in one place. For the UI, I separated everything into display components and control components to keep the code organized.
Instructions to Run the Project

Clone the repository

git clone https://github.com/yourusername/basketball-scoreboard.git
cd basketball-scoreboard

Install dependencies

npm install

Create a .env file in the project root and add your RapidAPI key (if you want to use the live scores feature)

REACT_APP_RAPIDAPI_KEY=your-api-key-here

Start the development server

npm start

Open your browser and go to http://localhost:3000

API Used and Data Handling
I integrated the NBA API from RapidAPI to get live basketball scores for the news ticker. The app fetches data from the API and displays it in a scrolling ticker at the bottom of the scoreboard.
The API data is handled in the sportsApi.ts file, which makes the API calls and transforms the response into the format my app needs. If the API call fails or there are no live games, the app handles this by showing a message in the ticker.
The main game data is managed through React's Context API in the ScoreboardContext.tsx file. This creates a central store for all the game state like scores, clock time, and fouls. Components can dispatch actions to update this state, which keeps the data flow clean and predictable.
Additional Features

Full Screen Mode: I added a full-screen mode that's perfect for displaying the scoreboard on a projector or large screen during actual games.
Custom Game Clock: The clock has different display formats (MM for regular time, and M.T for the last minute with tenths of seconds).
Possession arrows
Period Tracking: The app correctly handles quarters, overtime periods, and automatically labels them properly.
Responsive Design: The scoreboard works well on both desktop and mobile devices.
Team Customization: Team names can be changed on the fly through the control panel.
Quick Preset Times: Added common time presets for fast clock setting during timeouts.

