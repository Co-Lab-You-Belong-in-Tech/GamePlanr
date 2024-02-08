import { Link, useNavigate } from "react-router-dom";
import { googleAuthenticate } from "../services/UserProfileService";
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
  const navigate = useNavigate()

  const handleGoogleAuthenticate = async () => {
    const userProfileDetails = await googleAuthenticate();
    updateUserProfile(userProfileDetails)
    navigate('/home');
  }

  return (
    <>
      <header className="container">
        <Navbar />
        <div className="text-center row mx-auto mb-5">
          <div className="col-12 px-0">
            <h1 className="py-3 m-4 fw-bold fs-1">Welcome to GamePlanr</h1>
            <p className="">
              Play smarter, not harder, Enhance your soccer tham management,
              effortlessly organize, and stay connected with your teammates.
            </p>
            <Link
              to="/home"
              className="btn btn-outline-secondary mt-0"
              onClick={handleGoogleAuthenticate}
            >
              <img src={googleIconImage} alt="Google Icon" className="mb-1" />{" "}
              Sign up with Google
            </Link>
            <p className="TAC">
              By continuing, you agree to our{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                Terms and conditions
              </Link>{" "}
              <br></br>
              and acknowledge you&apos;ve read our{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                Privacy Policy.
              </Link>
            </p>
            <p className="fs-4">
              Already a member?{" "}
              <Link
                to="/home"
                style={{ textDecoration: "none" }}
                onClick={handleGoogleAuthenticate}
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </header>

      <main className="container-fluid" style={{ backgroundColor: "#E5FF9C" }}>
        <div style={{ maxWidth: "360px" }} className="mx-auto pb-2">
          <h1
            className="py-3"
            style={{
              fontFamily: "Noto Sans",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "32px",
              maxWidth: "350px",
            }}
          >
            Explore why teams prefer using GamePlanr to organize their soccer
            games
          </h1>
          <div className="main-row my-4">
            <img
              src={image1}
              alt="Effortless Team Creation Image"
              className="row-img"
            />
            <div className="row-title-and-bod mt-2">
              <h1 className="col-headline m-0">Effortless Team Creation</h1>
              <p className="col-body">
                Create up your team with streamlined setup, including member
                invitations.
              </p>
            </div>
          </div>
          <div className="main-row my-4">
            <div className="row-title-and-bod mt-2">
              <h1 className="col-headline m-0">Effortless Team Creation</h1>
              <p className="col-body">
                Create up your team with streamlined setup, including member
                invitations.
              </p>
            </div>
            <img
              src={image2}
              alt="Effortless Team Creation Image"
              className="row-img"
            />
          </div>
          <div className="main-row my-4">
            <img
              src={image3}
              alt="Effortless Team Creation Image"
              className="row-img"
            />
            <div className="row-title-and-bod mt-2">
              <h1 className="col-headline m-0">Effortless Team Creation</h1>
              <p className="col-body">
                Create up your team with streamlined setup, including member
                invitations.
              </p>
            </div>
          </div>
          <h1
            className="py-3 text-center"
            style={{
              fontFamily: "Noto Sans",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "32px",
            }}
          >
            Join now and revolutionize your sports team experience
          </h1>
          <Link
            to="/home"
            className="btn btn-outline-secondary althover"
            onClick={handleGoogleAuthenticate}
          >
            <img src={googleIconImage} alt="Google Icon" className="mb-1" />{" "}
            Sign up with Google
          </Link>
          <p className="TAC">
            By continuing, you agree to our{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Terms and conditions
            </Link>{" "}
            <br></br>
            and acknowledge you&apos;ve read our{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Privacy Policy.
            </Link>
          </p>
          <p className="fs-4 text-center my-4">
            Already a member?{" "}
            <Link
              to="/home"
              style={{ textDecoration: "none" }}
              onClick={handleGoogleAuthenticate}
            >
              Log In
            </Link>
          </p>
        </div>

        {/* <div className="row justify-content-center align-items-center">
          <div className="col col-md-5">
            <img
              src={image1}
              alt="Effortless Team Creation Image"
              className="rd"
            />
          </div>
          <div className="col col-md-3">
            <h2 className="fw-bold fs-3">Effortless Team Creation</h2>
            <p className="p-0">
              Create up your team with streamlined setup, including member
              invitations.
            </p>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col col-md-3">
            <h2 className="fw-bold fs-3">Efficient Game Planning</h2>
            <p className="p-0">
              Simplified scheduling for team leaders, specifying game details
              like time and location.
            </p>
          </div>
          <div className="col col-md-5">
            <img src={image2} alt="Effortless Team Creation Image" />
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <img src={image3} alt="Effortless Team Creation Image" />
          </div>
          <div className="col col-md-3">
            <h2 className="fw-bold fs-3">Seamless Communication</h2>
            <p className="p-0">
              Effortlessly inform, track attendance, and coordinate your team
              for every game.
            </p>
          </div>
        </div>
        
        <div className="row text-center">
          <div className="col-12 col-md-8 mx-auto mb-3">
            <Link
              to="/home"
              className="btn btn-outline-secondary althover mb-4"
              onClick={handleGoogleAuthenticate}
            >
              <img src={googleIconImage} alt="Google Icon" className="mb-1" />{" "}
              Sign up with Google
            </Link>
            <p className="fs-4">
              Already a member?{" "}
              <Link
                to="/home"
                style={{ textDecoration: "none" }}
                onClick={handleGoogleAuthenticate}
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
        */}
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
          <p className="col my-auto fs-4 fw-normal p-0">
            © 2024 GamePlanr Inc.
          </p>
          <div className="col p-0 d-flex justify-content-end ">
            <Link to="/" className="mx-1">
              <img src={FB} alt="" />
            </Link>
            <Link to="/" className="mx-1">
              <img src={insta} alt="" />
            </Link>
            <Link to="/" className="mx-1">
              <img src={Ximage} alt="" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Welcome;
