import { useState } from 'react';
import GamesContext from '../context/GamesContext';

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  
  const updateGames = (newGameData) => {
    setGames((prevGames) => {
      if (!Array.isArray(newGameData)) {
        // If newGameData is not an array, treat it as a single game object
        const gameIndex = prevGames.findIndex((game) => game.gameId === newGameData.gameId);
        if (gameIndex !== -1) {
          // If the game object exists, update its AttendingUsers array and keep other properties intact
          const updatedGames = [...prevGames];
          updatedGames[gameIndex] = { ...updatedGames[gameIndex], AttendingUsers: newGameData.AttendingUsers };
          return updatedGames;
        } else {
          // If the game object doesn't exist, append it to the existing array
          return [...prevGames, newGameData];
        }
      } else {
        // If newGameData is an array, treat each item as a separate game object
        return newGameData.reduce((updatedGames, gameData) => {
          const gameIndex = updatedGames.findIndex((game) => game.gameId === gameData.gameId);
          if (gameIndex !== -1) {
            updatedGames[gameIndex] = { ...updatedGames[gameIndex], AttendingUsers: gameData.AttendingUsers };
          } else {
            updatedGames.push(gameData);
          }
          return updatedGames;
        }, [...prevGames]);
      }
    });
  };


  return (
    <GamesContext.Provider value={{ games, updateGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesProvider;