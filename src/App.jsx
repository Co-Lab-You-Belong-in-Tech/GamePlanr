import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./views/Welcome";
import SignIn from "./views/SignIn";
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
import "./App.css";

function App() {
  return (
    <>
      <UserProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="sign-in" element={<SignIn />}/>
            <Route path="register" element={<Register />}/>
            <Route path="home" element={<Home />}/>
            <Route path="join-team" element={<JoinTeam />}/>
            <Route path="create-team" element={<CreateTeam />}/>
            <Route path="team" element={<Team />}/>
            <Route path="upcoming-games" element={<Games />}/>
            <Route path="schedule-game" element={<ScheduleGame />}/>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="notifications" element={<Notifications />}/>
          </Routes>
        </BrowserRouter>
      </UserProfileProvider>
    </>
  );
}

export default App;
