import { Link } from "react-router-dom";
import { SignUp, SignIn } from "../helpers/Auth";

const Welcome = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 bg-body-tertiary p-3 ms-2">Logo</span>
        </div>
      </nav>
      <div
        className="text-center row"
        style={{ height: "90vh", width: "100%" }}
      >
        <div className="col-12" style={{ height: "45vh" }}>
          <h1 className="bg-body-tertiary py-3 m-4">Headline</h1>
          <p className="bg-body-tertiary mx-5">Headline text...</p>
        </div>
        <div className="col-12" style={{ height: "20vh" }}>
          <Link to="/register" className="btn btn-tertiary" onClick={ SignUp }>
            Register
          </Link>
          <Link to="/sign-in" className="btn btn-tertiary" onClick={ SignIn }>
            Sign In
          </Link>
        </div>
        <div className="col-12" style={{ height: "fit-content" }}>
          <Link to="/" className="m-4 py-3 bg-body-tertiary d-block" style={{color: "black", textDecoration: "none"}}>
            Acceptance of Terms and Conditions / Privacy Policy Message?
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
