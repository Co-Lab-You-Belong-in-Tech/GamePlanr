import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useUserProfile } from "../context/UserProfileContext";

const SignIn = () => {
  const { userProfile } = useUserProfile();

  useEffect(() => {
    console.log("User Profile from Context:", userProfile);
  }, [userProfile]);

  return (
    <div>
      <header className="container">
        <Navbar />
        <div
          className="text-center row mx-auto"
          style={{ height: "70vh", width: "100%" }}
        >
          <div className="col-12">
            <h1 className="py-3 m-4 fw-bold fs-1">Sign In Successful</h1>
            <p className="mx-4">
              play smarter, not harder, Enhance your soccer tham management,
              effortlessly organize, and stay connected with your teammates.
            </p>
          </div>
        </div>
      </header>
      <Link to="/home" className="btn btn-primary">
        Continue
      </Link>
    </div>
  );
};
export default SignIn;
