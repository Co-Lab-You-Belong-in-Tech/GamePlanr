// PrivateRoutes.jsx
import { Outlet, Navigate } from 'react-router-dom';
import { useUserProfile } from '../context/UserProfileContext';

const PrivateRoutes = () => {
  const { userProfile } = useUserProfile();

  return userProfile ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
