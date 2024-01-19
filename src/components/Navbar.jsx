import logo from "../assets/LogoPlaceholder.png";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ps-0">
          <span className="navbar-brand">
            <img src={logo} alt="GamePlanr Logo" />
          </span>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
