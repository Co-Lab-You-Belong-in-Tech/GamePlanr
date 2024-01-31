import navbtn from "../assets/navbtn.png";
import navbtn2 from "../assets/navbtn2.png";
import navbtn3 from "../assets/navbtn3.png";
import navbtn4 from "../assets/navbtn4.png";
import navbtn5 from "../assets/navbtn5.png";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <>
      <div className="bottom-navbar navbar-light" style={{backgroundColor: "white"}}>
        <div className="container-fluid">
          <div className="row justify-content-between p-1">
            <div className="col column">
              <Link to="/home" className="d-block text-center">
                <img src={navbtn} alt="Navigate to home" />
              </Link>
            </div>
            <div className="col column">
              <Link to="/team" className="d-block text-center">
                <img src={navbtn2} alt="Navigate to team" />
              </Link>
            </div>
            <div className="col column">
              <Link to="/upcoming-games" className="d-block text-center">
                <img src={navbtn3} alt="Navigate to games" />
              </Link>
            </div>
            <div className="col column">
              <Link to="/notifications" className="d-block text-center">
                <img src={navbtn4} alt="Navigate to notifications" />
              </Link>
            </div>
            <div className="col column">
              <Link to="/profile" className="d-block text-center">
                <img src={navbtn5} alt="Navigate to profile" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BottomNav;
