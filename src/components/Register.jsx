import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      Register 
      <Link to="/create-team">Create Team</Link>
      <Link to="/join-team">Join Team</Link>
    </div>
  );
};
export default Register;
