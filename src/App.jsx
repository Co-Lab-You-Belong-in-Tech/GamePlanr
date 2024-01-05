import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Home from "./components/Home";
import JoinTeam from "./components/JoinTeam";
import CreateTeam from "./components/CreateTeam";
import Team from "./components/Team";
import Games from "./components/Games";
import ScheduleGame from "./components/ScheduleGame";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";
import "./App.css";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
