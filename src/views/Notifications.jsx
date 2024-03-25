import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import logo from "../assets/LogoPlaceholder.png";

const Notifications = () => {
  return (
    <>
      <main className="gameplanr-container action-buttons mt-2">
        <div className="d-flex justify-content-between mb-2">
          <p className="me-"></p>
          <p className="fs-3 fw-bold">Notifications</p>
          <p className="fs-4 me-3 my-auto pb-3"></p>
        </div>
        <div className="notification-container">
          <div className="message-and-logo">
            <div className="message">
              <div className="notification-logo">
                <img src={logo} alt="GamePlanr Logo" />
              </div>
              <div className="notification-text">
                <p>
                  Install GamePlanr on your homescreen for quick and easy access
                  on the go
                </p>
              </div>
            </div>
            <div className="time-received">
              <p className="fw-light fs-4">20 minutes ago</p>
            </div>
          </div>
          <div className="close-btn-div">
            <button
              className="close-button mb-3 link-underline link-underline-opacity-0"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
        <hr />
        <div className="notification-container">
          <div className="message-and-logo">
            <div className="message">
              <div className="notification-logo">
                <img src={logo} alt="GamePlanr Logo" />
              </div>
              <div className="notification-text">
                <p>
                  Install GamePlanr on your homescreen for quick and easy access
                  on the go
                </p>
              </div>
            </div>
            <div className="time-received">
              <p className="fw-light fs-4">20 minutes ago</p>
            </div>
          </div>
          <div className="close-btn-div">
            <button
              className="close-button mb-3 link-underline link-underline-opacity-0"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
        <hr />
      </main>
      <footer className="home-footer container-fluid px-0">
        <BottomNav />
      </footer>
    </>
  );
};
export default Notifications;
