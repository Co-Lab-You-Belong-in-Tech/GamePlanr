import { useState } from 'react';
import TeamContext from '../context/TeamContext';

const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(null);

  const updateTeam = (newTeam) => {
    setTeam(newTeam);
  };

  return (
    <TeamContext.Provider value={{ team, updateTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamProvider;