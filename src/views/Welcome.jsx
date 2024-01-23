import { Link } from "react-router-dom";
import { signIn, signUp } from "../services/UserProfileService";
import { useUserProfile } from "../context/UserProfileContext";
import Navbar from "../components/Navbar";
import googleIconImage from "../assets/Left-icon-wrapper.png";
import image1 from "../assets/Images.png";
import image2 from "../assets/Images1.png";
import image3 from "../assets/Images2.png";
import Ximage from "../assets/X.png";
import insta from "../assets/insta.png";
import FB from "../assets/FB.png";

const Welcome = () => {
  const { updateUserProfile } = useUserProfile();

  const handleSignUp = async () => {
    await signUp(updateUserProfile);
  };

  const handleSignIn = async () => {
    await signIn(updateUserProfile);
  };

  return (
    <>
      <header className="container">
        <Navbar />
        <div
          className="text-center row mx-auto"
          style={{ height: "70vh", width: "100%" }}
        >
          <div className="col-12">
            <h1 className="py-3 m-4 fw-bold fs-1">Welcome to GamePlanr</h1>
            <p className="mx-4">
              play smarter, not harder, Enhance your soccer tham management,
              effortlessly organize, and stay connected with your teammates.
            </p>
          </div>
          <div className="col-12">
            <Link
              to="/register"
              className="btn btn-outline-secondary"
              onClick={handleSignUp}
            >
              <img src={googleIconImage} alt="Google Icon" className="mb-1" />{" "}
              Sign up with Google
            </Link>
            <p className="fs-4">
              Already a member?{" "}
              <Link
                to="/sign-in"
                style={{ textDecoration: "none" }}
                onClick={handleSignIn}
              >
                Log In
              </Link>
            </p>
          </div>
          <div className="col-12" style={{ height: "fit-content" }}>
            <p className="fw-normal fs-4">
              By continuing, you agree to our{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                Terms and conditions and
              </Link>{" "}
              <br></br>
              and acknowledge you&apos;ve read{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                our Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </header>

      <main
        className="container-fluid mt-5"
        style={{ backgroundColor: "#E5FF9C" }}
      >
        <h1 className="py-3 fw-bold fs-2 ms-4 text-center">
          Explore why teams prefer using GamePlanr to organize their soccer
          games
        </h1>
        <div
          className="row justify-content-center align-items-center"
          style={{ margin: "30px 10px 0px 10px" }}
        >
          <div className="col col-md-5">
            <img src={image1} alt="Effortless Team Creation Image" />
          </div>
          <div className="col col-md-3">
            <h2 className="fw-bold fs-3">Effortless Team Creation</h2>
            <p>
              Create up your team with streamlined setup, including member
              invitations.
            </p>
          </div>
        </div>
        <div
          className="row justify-content-center align-items-center"
          style={{ margin: "30px 10px 0px 10px" }}
        >
          <div className="col col-md-3">
            <h2 className="fw-bold fs-3">Efficient Game Planning</h2>
            <p>
              Simplified scheduling for team leaders, specifying game details
              like time and location.
            </p>
          </div>
          <div className="col col-md-5">
            <img
              src={image2}
              className="float-md-end"
              alt="Effortless Team Creation Image"
            />
          </div>
        </div>
        <div
          className="row justify-content-center align-items-center"
          style={{ margin: "30px 10px 0px 10px" }}
        >
          <div className="col col-md-5">
            <img src={image3} alt="Effortless Team Creation Image" />
          </div>
          <div className="col col-md-3 p-0">
            <h2 className="fw-bold fs-3">Seamless Communication</h2>
            <p>
              Effortlessly inform, track attendance, and coordinate your team
              for every game.
            </p>
          </div>
        </div>
        <div className="row text-center mt-4">
          <div className="col-12 col-md-8 mx-auto mb-3">
            <Link
              to="/register"
              className="btn btn-outline-secondary althover mb-4"
              onClick={handleSignUp}
            >
              <img src={googleIconImage} alt="Google Icon" className="mb-1" />{" "}
              Sign up with Google
            </Link>
            <p className="fs-4">
              Already a member?{" "}
              <Link
                to="/sign-in"
                style={{ textDecoration: "none" }}
                onClick={handleSignIn}
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer
        className="container-fluid pb-3"
        style={{ backgroundColor: "#272224", color: "white" }}
      >
        <div className="row text-center welcome">
          <Link
            className="col-12 mt-5"
            to="https://getbootstrap.com/docs/5.3/components/button-group/"
          >
            About Us
          </Link>
          <Link
            className="col-12 mt-5"
            to="https://getbootstrap.com/docs/5.3/components/button-group/"
          >
            Terms & Conditions
          </Link>
          <Link
            className="col-12 mt-5"
            to="https://getbootstrap.com/docs/5.3/components/button-group/"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="row mt-5 mx-1">
          <p className="col my-auto fs-4 fw-normal ms-3">
            © 2024 GamePlanr Inc.
          </p>
          <div className="col p-0 d-flex justify-content-end ">
            <Link to="/" className="mx-2">
              <img src={FB} alt="" />
            </Link>
            <Link to="/" className="mx-2">
              <img src={insta} alt="" />
            </Link>
            <Link to="/" className="mx-2">
              <img src={Ximage} alt="" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Welcome;
