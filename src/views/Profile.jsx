import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import userPicPlaceholder from "../assets/user-pic-placeholder.png";

const Profile = () => {
  return (
    <>
      <main className="gameplanr-container action-buttons mt-2">
        <div className="d-flex justify-content-between mb-2">
          <p className="ms-4"></p>
          <p className="fs-3 fw-bold">Your Profile</p>
          <p className="fs-4 my-auto pb-3">Edit</p>
        </div>
        <div className="d-flex justify-content-center mb-1">
          <img src={userPicPlaceholder} alt="" style={{ height: "96px" }} />
        </div>
        <div className="d-flex justify-content-center mb-3">
          <h5 className="card-title mb-0 fs-2 fw-bold">User Name</h5>
        </div>
        <h3 className="fs-3 fw-bold ms-3 mb-1">Games Played</h3>
        <div className="time-received">
          <p className="fs-4">All Time: 0</p>
        </div>
        <hr />
      </main>
      <footer className="home-footer container-fluid px-0">
        <BottomNav />
      </footer>
    </>
  );
};
export default Profile;
