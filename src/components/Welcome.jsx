import { Link } from "react-router-dom";

const Welcome = () => {
  return (<div>Welcome
    <Link to="/register">Register</Link>
    <Link to="/sign-in">Sign In</Link>
  </div>);
};
export default Welcome;
