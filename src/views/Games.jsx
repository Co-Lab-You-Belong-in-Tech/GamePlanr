import { Link } from "react-router-dom";
import { useState } from "react";
import handwave from "../assets/HandWave.png";
import BottomNav from "../components/BottomNav";
import safarishare from "../assets/SafariShareIcon.png";
import locationIcon from "../assets/ion_location-outline.png";
import goingImg from "../assets/going.png";
import notGoing from "../assets/notGoing.png";
import notGoingRed from "../assets/NotGoingRed.png";
import goingGreen from "../assets/AttendingGreen.png";
import buttonsClose from "../assets/buttons-close.png";

const Games = () => {
  // const homeState = {
  //   INITIAL: "initial",
  //   TEAM_CREATED_GAMES_SCHEDULED: "team_created_games_scheduled",
  //   TEAM_CREATED_EMPTY_GAMES: "team_created_empty_games",
  // };

  // const [currentState, setCurrentState] = useState(homeState.INITIAL);
  const [responded, setResponded] = useState(false);
  const [going, setGoing] = useState(goingImg);
  // const [numOfPlayers, setNumOfPlayers] = useState(0)
  // const [numOfPlayersAttending, setNumOfPlayersAttending] = useState(0);
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const state = queryParams.get("state");
  // const { games } = useGames();
  // const { updateGames } = useGames();
  // const { userProfile } = useUserProfile();

  const updateResponse = () => {
    if (responded === true) {
      setResponded(false)
      setGoing(notGoingRed);
    } else {
      setResponded(true)
      setGoing(goingGreen);
    }
  }

  return (
    <div>
      <main className="home-main">
        <div className="gameplanr-container action-buttons mt-2">
          <div className="d-flex justify-content-between">
            <p className="me-"></p>
            <p className="fs-3 fw-bold">Your Games</p>
            <p className="fs-4 me-3 my-auto pb-3"></p>
          </div>
          <div className="upcoming-or-past-container mb-2">
            <button className="upcoming-or-past-btn btn-active">
              Upcoming
            </button>
            <button className="upcoming-or-past-btn">Past</button>
          </div>
          <h3 className="fs-3 fw-bold ms-3">January</h3>
          <div
            className="card mb-3 border-0"
            style={{ maxWidth: "540px", border: "" }}
          >
            {responded ? (
              <div className="row align-items-center g-0">
                <div className="col-3 text-center">
                  <h5 className="card-title fs-2 fw-bold text-primary">
                    THU 11
                  </h5>
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <p>12:00 AM - 12:30 AM</p>
                    <p className="card-text fs-4">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="pb-1"
                      />{" "}
                      Spokane
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <img
                    src={going}
                    alt="Undo button"
                    className="img-btn pb-2 ms-3"
                    onClick={() => updateResponse()}
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title fs-2 fw-bold text-primary">
                    THU 11
                  </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "4px",
                    alignSelf: "stretch",
                    width: "300px",
                  }}
                >
                  <div className="card-body">
                    <p>12:00 AM - 12:30 AM</p>
                    <p className="card-text fs-4">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="pb-1"
                      />{" "}
                      Spokane
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "6px 12px",
                    alignItems: "flex-start",
                    gap: "8px",
                    position: "abosolute",
                    right: "0px",
                    bottom: "-4px",
                    borderRadius: "8px",
                    boxShadow:
                      "3.457px 3.457px 18.537px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <div className="text-center">
                    <img
                      src={goingGreen}
                      alt="Undo button"
                      className="img-btn pb-2"
                      onClick={() => updateResponse()}
                    />
                    <p className="fs-4">Going</p>
                  </div>
                  <div className="text-center" style={{ width: "69px" }}>
                    <img
                      src={notGoingRed}
                      alt="Undo button"
                      className="img-btn pb-2"
                      onClick={() => updateResponse()}
                    />
                    <p className="fs-4">Not Going</p>
                  </div>
                  <img
                    className="img-btn mt-2"
                    src={buttonsClose}
                    alt="Close buttons"
                  />
                </div>
              </div>
            )}
          </div>
          <button
            className="btn btn-primary btn-lg full-width-button mt-5"
          >
            Schedule Game
          </button>
        </div>
      </main>

      <footer className="home-footer container-fluid px-0">
        <BottomNav />
      </footer>
    </div>
  );
};
export default Games;
