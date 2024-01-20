import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useUserProfile } from "../context/UserProfileContext";

const SignIn = () => {
  const { userProfile } = useUserProfile();

  useEffect(() => {
    console.log("User Profile from Context:", userProfile);
  }, [userProfile]);

  return <div>SignIn
    <Link to="/home">Sign In</Link>
  </div>;
};
export default SignIn;
