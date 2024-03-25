import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./views/Welcome";
// import SignIn from "./views/SignIn";
import Register from "./views/Register";
import Home from "./views/Home";
import JoinTeam from "./views/JoinTeam";
import CreateTeam from "./views/CreateTeam";
import Team from "./views/Team";
import Games from "./views/Games";
import ScheduleGame from "./views/ScheduleGame";
import Profile from "./views/Profile";
import Notifications from "./views/Notifications";
import UserProfileProvider from "./providers/UserProfileProvider";
import TeamProvider from "./providers/TeamProvider";
import GamesProvider from "./providers/GamesProvider";
import PrivateRoutes from "./services/PrivateRoutes";
import "./App.css";

function App() {
  return (
    <>
      <UserProfileProvider>
        <TeamProvider>
          <GamesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="upcoming-games" element={<Games />} />
                <Route path="team" element={<Team />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="register" element={<Register />} />
                  <Route path="home" element={<Home />} />
                  <Route path="join-team" element={<JoinTeam />} />
                  <Route path="create-team" element={<CreateTeam />} />

                  <Route path="schedule-game" element={<ScheduleGame />} />
                </Route>
                <Route path="/" element={<Welcome />} />
              </Routes>
            </BrowserRouter>
          </GamesProvider>
        </TeamProvider>
      </UserProfileProvider>
    </>
  );
}

<Route path="/" element={<Welcome />} />

export default App;
