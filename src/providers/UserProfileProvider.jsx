import { useState, useEffect } from 'react';
import UserProfileContext from '../context/UserProfileContext';

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const updateUserProfile = (newUserProfile) => {
    setUserProfile(newUserProfile);
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
