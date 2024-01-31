import { useState } from 'react';
import GamesContext from '../context/GamesContext';

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState(null);

  const updateGames = (newGames) => {
    setGames(newGames);
  };

  // useEffect(() => {
  //   // Fetch games from database and update state
  //   const fetchGames = async () => {
  //     const gamesData = await fetchGamesFromDatabase();
  //     setGames(gamesData);
  //   };
  //   fetchGames();
  // }, []);

  return (
    <GamesContext.Provider value={{ games, updateGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesProvider;