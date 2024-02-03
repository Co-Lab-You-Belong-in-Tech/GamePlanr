import { Link, useLocation } from "react-router-dom";
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
import { useState, useEffect } from "react";
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from "../services/FirebaseConfig";
import { useGames } from "../context/GamesContext";
import { useUserProfile } from "../context/UserProfileContext";
import { updateAttendingUsersInGame } from "../services/GamesService";


const Home = () => {
  const homeState = {
    INITIAL: "initial",
    TEAM_CREATED_GAMES_SCHEDULED: "team_created_games_scheduled",
    TEAM_CREATED_EMPTY_GAMES: "team_created_empty_games"
  }
  // const currentState = homeState.TEAM_CREATED_GAMES_SCHEDULED

  const [currentState, setCurrentState] = useState(homeState.INITIAL);
  const [responded, setResponded] = useState(false);
  const [going, setGoing] = useState(goingImg);
  // const [numOfPlayers, setNumOfPlayers] = useState(0)
  const [numOfPlayersAttending, setNumOfPlayersAttending] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const { games } = useGames();
  const { updateGames } = useGames();
  const { userProfile } = useUserProfile();


  // RealTime Listener to track attendance by how many players have responded 'Going'
  useEffect(() => {
    if (state === "team_created_games_scheduled" && games) {
      setCurrentState(homeState.TEAM_CREATED_GAMES_SCHEDULED);
      console.log('Game data in Home.jsx:', games)
      const unsubscribe = onSnapshot(doc(db, 'games', games.gameId), (docSnapshot) => {
        const { AttendingUsers } = docSnapshot.data();

        // Update state with the length of the AttendingUsers array to show how many players are attending
        setNumOfPlayersAttending(AttendingUsers.length);

        // Update the games context with the new data
        updateGames(prevGames => ({
          ...prevGames,
          AttendingUsers
        }));
        console.log('useEffect', games, updateGames)
      });
      return () => unsubscribe();
    }
  }, [state]);


  // Format of players attending / players needed for game
  const playersAttendingDisplay = `${numOfPlayersAttending}/${games ? games.playersNeeded : "Loading..."} Going`;


  // Format date from Games Context to get Mon Day for display in game data
  const formatDate = (date) => {
    if (!date) return "";
    const options = { weekday: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Split the formatted date into day and date parts
    const [dayOfWeek, dayOfMonth] = formattedDate.split(' ');

    // Capitalize all three letters of the day of the week
    const capitalizedDayOfWeek = dayOfWeek.toUpperCase();
    
    // Return the formatted date with the day of the week and date parts switched
    return `${dayOfMonth} ${capitalizedDayOfWeek}`;
  };
  

  // Calculate end time of game by using startDate from games Context and generate time for display
  const calculateEndTime = (startDate, duration) => {
    if (!startDate || !duration) return "";
  
    // Convert duration from '90min' format to minutes
    const durationInMinutes = parseInt(duration.match(/\d+/)[0]);
  
    // Clone the startDate to avoid mutating the original date
    const endTime = new Date(startDate);
  
    // Add the duration to the start time
    endTime.setMinutes(endTime.getMinutes() + durationInMinutes);
  
    // Format start and end times
    const formattedStartTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    // Return the formatted start and end times
    return `${formattedStartTime} - ${formattedEndTime}`;
  };


  const updateAttendingUsers = async (gameId, userId, response) => {
    try {
      console.log('whoop!', gameId, userId);
      if (response === "going") {
        // If the user responded as Going we add their userId to Firebase AttendingUsers array
        await updateAttendingUsersInGame(gameId, userId, "going");
        setGoing(goingGreen);
      } else {
        setGoing(notGoingRed)
      }
      // Update responded state
      setResponded(true)
    } catch (error) {
      console.error("Error updating attending users:", error);
    }
  };

  
  // Handle undo of responding 'Going' or 'Not Going'
  const undoResponse = () => {
    console.log("function called");
    // If response was 'Going' we need to remove userId from Firebase AttendingUsers array
    if (going === goingGreen && games && userProfile){
      updateAttendingUsersInGame(games.gameId, userProfile.userID, "not going");
    }
    setGoing(goingImg);
    setResponded(false);
  }



  if(currentState === homeState.INITIAL){
    return (
      <div>
        <header className="container">
          <Navbar />
        </header>
        <main>
          <div className="container">
            <h2 className="fs-2 fw-bold mt-5 text-center">
              Welcome, User <img src={handwave} alt="handwave" />
            </h2>
          </div>

          <div className="gameplanr-container action-buttons px-2">
            <p className="fs-3 fw-bold mt-3 mb-0">
              Ready to Elevate Your Game?
            </p>
            <p className="pt-1">
              Create or join a team to dive into the action
            </p>
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
          <div className="install-instructions">
            <p className="fs-3 fw-bold">Enjoy GamePlanr to the fullest</p>
            <p>
              Install GamePlanr on your homescreen for quick and easy access
              when you&apos;re on the go!
            </p>
            <div className="text-center">
              <p className="fs-4 fw-medium">
                Just tap <img src={safarishare} alt="Safari Share Icon" /> then
                &apos;Add to Home Screen&apos;
              </p>
            </div>
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
              Hey there <img src={handwave} alt="handwave" />
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
                  {games ? formatDate(games.startDate) : "Loading..."}
                  </h5>
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <p>{games ? calculateEndTime(games.startDate, games.duration) : "Loading..."}</p>
                    <p className="card-text fs-4">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="pb-1"
                      />{" "}
                      {games ? games.location : "Loading..."}
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
                      onClick={() => undoResponse()}
                    />
                    <p className="fs-4">{playersAttendingDisplay}</p>
                  </div>
                ) : (
                  <div className="col-3">
                    <p className="text-primary fs-4 pt-3">You Going?</p>
                    <p className="fs-4">{playersAttendingDisplay}</p>
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
                      onClick={() => updateAttendingUsers(games.gameId, userProfile.userID, "going")}
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src={notGoing}
                      alt="Not going button"
                      className="img-btn"
                      onClick={() => updateAttendingUsers(games.gameId, userProfile.userID, "not going")}
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
          <div className="install-instructions">
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
