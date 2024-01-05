import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Home
      <Link to="/home" className="btn btn-success">
        Home
      </Link>
      <Link to="/team" className="btn btn-success">
        Team
      </Link>
      <Link to="/upcoming-games" className="btn btn-success">
        Upcoming Games
      </Link>
      <Link to="/notifications" className="btn btn-success">
        Notifications
      </Link>
      <Link to="/profile" className="btn btn-success">
        Profile
      </Link>
    </div>
  );
};
export default Home;
