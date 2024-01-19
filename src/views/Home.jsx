import { Link } from "react-router-dom";
import handwave from "../assets/HandWave.png";
import BottomNav from "../components/BottomNav";
import safarishare from "../assets/SafariShareIcon.png";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <header className="container">
        <Navbar />
      </header>
      <main>
        <div className="container text-center">
          <h2 className="fs-2 fw-bold mt-5">
            Welcome, User <img src={handwave} alt="handwave" />
          </h2>
          <p className="fs-3 fw-bold mt-3 mb-0">Ready to Elevate Your Game?</p>
          <p className="pt-1">Create or join a team to dive into the action</p>
        </div>

        <div className="gameplanr-container action-buttons mt-5">
          <Link
            to="/create-team"
            className="btn btn-primary btn-lg full-width-button"
          >
            Create a Team
          </Link>
          <Link
            to="/join-team"
            className="btn btn-secondary btn-lg full-width-button"
          >
            Join a Team
          </Link>
        </div>
      </main>

      <footer className="home-footer container-fluid px-0">
        <div className="install-instructions text-center">
          <p className="fs-3 fw-bold">Enjoy GamePlanr to the fullest</p>
          <p>
            Install GamePlanr on your homescreen for quick and easy access when
            you&apos;re on the go!
          </p>
          <p className="fs-4 fw-medium">
            Just tap <img src={safarishare} alt="Safari Share Icon" /> then
            &apos;Add to Home Screen&apos;
          </p>
        </div>
        <BottomNav />
      </footer>
    </>
  );
};
export default Home;
