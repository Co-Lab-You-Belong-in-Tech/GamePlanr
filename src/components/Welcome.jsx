import { Link } from "react-router-dom";

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
          <Link to="/register" className="btn btn-tertiary">
            Register
          </Link>
          <Link to="/sign-in" className="btn btn-tertiary">
            Sign In
          </Link>
        </div>
        <div className="col-12" style={{ height: "fit-content" }}>
          <p className="m-4 py-3 bg-body-tertiary">
            Acceptance of Terms and Conditions / Privacy Policy Message?
          </p>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
