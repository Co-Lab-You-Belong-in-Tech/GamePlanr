import { Link } from "react-router-dom";
import handwave from "../assets/HandWave.png";
import BottomNav from "../components/BottomNav";
import safarishare from "../assets/SafariShareIcon.png";
import locationIcon from "../assets/ion_location-outline.png";
import Navbar from "../components/Navbar";
import goingImg from "../assets/going.png";
import notGoing from "../assets/notGoing.png";
import notGoingRed from "../assets/NotGoingRed.png";
import goingGreen from "../assets/AttendingGreen.png";
import empty from "../assets/Empty.png";
import { useState } from "react";

const Home = () => {
  const homeState = {
    INITIAL: "initial",
    TEAM_CREATED_GAMES_SCHEDULED: "team_created_games_scheduled",
    TEAM_CREATED_EMPTY_GAMES: "team_created_empty_games"
  }
  // const currentState = homeState.TEAM_CREATED_GAMES_SCHEDULED

  const [currentState, setCurrentState] = useState(
    homeState.INITIAL
  );
  const [responded, setResponded] = useState(false);
  const [going, setGoing] = useState(goingImg);
  const [numOfPlayers, setNumOfPlayers] = useState(0)
  const handleResponse = (response) => {
    console.log("function called");
    if(responded === false) {
       setResponded(true)
    }

    if (response === "going"){
      setGoing(goingGreen);
      setNumOfPlayers(numOfPlayers + 1)
    }
    if (response === "not going") {
      setGoing(notGoingRed);
    }
  }

  const undoResponse = () => {
    console.log("function called");
    setResponded(false)
    setNumOfPlayers(0)
  }


  if(currentState === homeState.INITIAL){
    return (
      <div>
        <header className="container">
          <Navbar />
        </header>
        <main>
          <div className="container text-center">
            <h2 className="fs-2 fw-bold mt-5">
              Welcome, User <img src={handwave} alt="handwave" />
            </h2>
            <p className="fs-3 fw-bold mt-3 mb-0">
              Ready to Elevate Your Game?
            </p>
            <p className="pt-1">
              Create or join a team to dive into the action
            </p>
          </div>

          <div className="gameplanr-container action-buttons">
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
              Install GamePlanr on your homescreen for quick and easy access
              when you&apos;re on the go!
            </p>
            <p className="fs-4 fw-medium">
              Just tap <img src={safarishare} alt="Safari Share Icon" /> then
              &apos;Add to Home Screen&apos;
            </p>
          </div>
          <BottomNav />
        </footer>
      </div>
    );
  } else if ( currentState === homeState.TEAM_CREATED_GAMES_SCHEDULED){
    return (
      <div>
        <header className="container">
          <Navbar />
        </header>
        <main className="home-main">
          <div className="container text-center">
            <h2 className="fs-2 fw-bold mt-5">
              Welcome, User <img src={handwave} alt="handwave" />
            </h2>
          </div>

          <div className="gameplanr-container action-buttons mt-2">
            <h3 className="fs-3 fw-bold ms-3">Upcoming Game</h3>
            <div
              className="card mb-3 border-0"
              style={{ maxWidth: "540px", border: "" }}
            >
              <div className="row align-items-center g-0">
                <div className="col-3 text-center">
                  <h5 className="card-title fs-2 fw-bold text-primary">
                    THU 11
                  </h5>
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <p>5:00 PM - 6:00 PM</p>
                    <p className="card-text fs-4">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="pb-1"
                      />{" "}
                      Chelsea Park
                    </p>
                  </div>
                </div>
                {responded ? (
                  <div
                    className="col-3"
                  >
                    <img
                      src={going}
                      alt="Undo button"
                      className="img-btn pb-2 ms-3"
                      onClick={undoResponse}
                    />
                    <p className="fs-4">{numOfPlayers}/12 Going</p>
                  </div>
                ) : (
                  <div className="col-3">
                    <p className="text-primary fs-4 pt-3">You Going?</p>
                    <p className="fs-4">{numOfPlayers}/12 Going</p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mx-auto" style={{ maxWidth: "275px" }}>
              <p className="fw-bold">Are you going to this game?</p>
              {responded ? (<div></div>):(<div className="container">
                <div className="row justify-content-center">
                  <div className="col-4">
                    <img
                      src={goingImg}
                      alt="Going button"
                      className="img-btn"
                      onClick={() => handleResponse("going")}
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src={notGoing}
                      alt="Not going button"
                      className="img-btn"
                      onClick={() => handleResponse("not going")}
                    />
                  </div>
                </div>
              </div>)}
            </div>
          </div>
        </main>

        <footer className="home-footer container-fluid px-0">
          <div className="install-instructions text-center">
            <p className="fs-3 fw-bold">Enjoy GamePlanr to the fullest</p>
            <p>
              Install GamePlanr on your homescreen for quick and easy access
              when you&apos;re on the go!
            </p>
            <p className="fs-4 fw-medium">
              Just tap <img src={safarishare} alt="Safari Share Icon" /> then
              &apos;Add to Home Screen&apos;
            </p>
          </div>
          <BottomNav />
        </footer>
      </div>
    );
  } else if (currentState === homeState.TEAM_CREATED_EMPTY_GAMES) {
    return (
      <div>
        <header className="container">
          <Navbar />
        </header>
        <main>
          <div className="container text-center" style={{ height: "500px" }}>
            <div className="align-middle">
              <img src={empty} alt="No games image" />
              <p className="fw-bold">You have No upcoming games</p>
            </div>
          </div>
        </main>

        <footer className="home-footer container-fluid px-0">
          <div className="install-instructions text-center">
            <p className="fs-3 fw-bold">Enjoy GamePlanr to the fullest</p>
            <p>
              Install GamePlanr on your homescreen for quick and easy access
              when you&apos;re on the go!
            </p>
            <p className="fs-4 fw-medium">
              Just tap <img src={safarishare} alt="Safari Share Icon" /> then
              &apos;Add to Home Screen&apos;
            </p>
          </div>
          <BottomNav />
        </footer>
      </div>
    );
  } else {
    return <div>null</div>
  }
  
};
export default Home;
