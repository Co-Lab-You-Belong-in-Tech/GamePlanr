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
import { useState, useEffect } from "react";
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from "../services/FirebaseConfig";
import { useGames } from "../context/GamesContext";
import { useTeam } from "../context/TeamContext";
import { useUserProfile } from "../context/UserProfileContext";
import { updateAttendingUsersInGame } from "../services/GamesService";


const Home = () => {
  const homeState = {
    INITIAL: "initial",
    TEAM_CREATED_GAMES_SCHEDULED: "team_created_games_scheduled",
    TEAM_CREATED_EMPTY_GAMES: "team_created_empty_games"
  }

  const [currentState, setCurrentState] = useState(homeState.INITIAL);
  const [responded, setResponded] = useState(false);
  const [going, setGoing] = useState(goingImg);
  const { games, updateGames } = useGames();
  const { team } = useTeam();
  const { userProfile } = useUserProfile();


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (team) {
          if (games && games.length > 0) {
            setCurrentState(homeState.TEAM_CREATED_GAMES_SCHEDULED);           
            // RealTime Listener to track attendance by how many players have responded 'Going'
            const unsubscribe = onSnapshot(doc(db, 'games', games[0]?.gameId), (docSnapshot) => {        
              // Ensure gameId is retained
              const gameId = docSnapshot.id;
              const updatedGame = { ...docSnapshot.data(), gameId };
              updateGames(updatedGame)
            });
            return () => unsubscribe();
          } else {
            setCurrentState(homeState.TEAM_CREATED_EMPTY_GAMES);
          }
        }
      } catch (error) {
        console.error('Error fetching or updating game data:', error);
      }
    };
    fetchData();
  }, [team]);
   

  // Format of players attending / players needed for game
  const getPlayersAttendingDisplay = (game) => {
    if (!game) return "";
    return `${game.AttendingUsers.length}/${game.playersNeeded} Going`;
  };

  // Format date from Games Context to get Mon Day for display in game data
  const formatDate = (date) => {
    if (!date) return "";

    const options = { weekday: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Split the formatted date into day and date parts
    const [dayOfMonth, dayOfWeek] = formattedDate.split(' ');

    // Capitalize all three letters of the day of the week
    const capitalizedDayOfWeek = dayOfWeek.toUpperCase();
    
    // Return the formatted date with the day of the week and date parts switched
    return (
      <div>
        <span>{capitalizedDayOfWeek}</span>
        <br />
        <span>{dayOfMonth}</span>
      </div>
    );
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
    const formattedStartTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0(\d)/, '$1');
    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0(\d)/, '$1');
  
    // Return the formatted start and end times
    return `${formattedStartTime} - ${formattedEndTime}`;
  };


  const updateAttendingUsers = async (gameId, userId, response) => {
    try {
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
  const undoResponse = (gameId) => {
    // Check if the user is marked as going in the game
    const isGoing = games && games.find(game => game.gameId === gameId && game.AttendingUsers.includes(userProfile.userID));
    if (isGoing && userProfile){
      updateAttendingUsersInGame(gameId, userProfile.userID, "not going");
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
  } else if (currentState === homeState.TEAM_CREATED_GAMES_SCHEDULED){
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
          {/* Iterate over the games array and render each game */}
          {games && games.map((game, index) => (
            <div key={index} className="gameplanr-container action-buttons mt-2">
              <h3 className="fs-3 fw-bold ms-3">Upcoming Game</h3>
              <div className="card mb-3 border-0" style={{ maxWidth: "540px", border: "" }}>
                <div className="row align-items-center g-0">
                  <div className="col-3 text-center">
                    <h5 className="card-title fs-2 fw-bold text-primary">
                      {formatDate(game.startDate)}
                    </h5>
                  </div>
                  <div className="col-6">
                    <div className="card-body">
                      <p>{calculateEndTime(game.startDate, game.duration)}</p>
                      <p className="card-text fs-4">
                        <img src={locationIcon} alt="Location Icon" className="pb-1" /> {game.location}
                      </p>
                    </div>
                  </div>
                  {responded ? (
                    <div className="col-3">
                      <img src={going} alt="Undo button" className="img-btn pb-2 ms-3" onClick={() => undoResponse(game.gameId)} />
                      <p className="fs-4">{getPlayersAttendingDisplay(game)}</p>
                    </div>
                  ) : (
                    <div className="col-3">
                      <p className="text-primary fs-4 pt-3">You Going?</p>
                      <p className="fs-4">{getPlayersAttendingDisplay(game)}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center mx-auto" style={{ maxWidth: "275px" }}>
                {responded ? (
                  <div></div>
                ) : (
                  <div>
                    <p className="fw-bold">Are you going to this game?</p>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-4">
                          <img src={goingImg} alt="Going button" className="img-btn" onClick={() => updateAttendingUsers(game.gameId, userProfile.userID, "going")} />
                        </div>
                        <div className="col-4">
                          <img src={notGoing} alt="Not going button" className="img-btn" onClick={() => updateAttendingUsers(game.gameId, userProfile.userID, "not going")} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
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
