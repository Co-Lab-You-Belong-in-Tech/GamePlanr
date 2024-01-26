import { Link } from "react-router-dom";
import { useState } from "react";
import teamIcon from "../assets/TeamIcon.png"
import membersIcon from "../assets/members-icon.png";
import navbtn5 from "../assets/navbtn5.png";
import copyIcon from "../assets/copyIcon.png";
import shareIcon from "../assets/shareIcon.png";
import BottomNav from "../components/BottomNav";


const Team = () => {
  const [inviteFriends, setInviteFriends] = useState(false)
  console.log(inviteFriends)
  return (
    <>
      {inviteFriends ? (
        <div className="gameplanr-container">
          <div className="d-flex justify-content-between">
            <p className="me-2"></p>
            <p className="">Invite your Friends</p>
            <button
              to="/team"
              className="close-button mb-3 link-underline link-underline-opacity-0"
              aria-label="Close"
              onClick={() => setInviteFriends(false)}
            >
              &times;
            </button>
          </div>
          <h3 className="fs-3 fw-bold">
            It&apos;s not a team without your people
          </h3>
          <p className="">
            Invite your friends to join your team by sharing the code below:
          </p>
          <div className="container text-center my-5">
            <div className="gradient-border">
              <input
                value="THX-341"
                className="mx-auto text-center p-5"
                readOnly
              />
            </div>
            <div className="row justify-content-center mt-4">
              <p className="col-4 fs-4">
                <img src={copyIcon} alt="Copy Code Button" /> Copy Code
              </p>
              <p className="col-4 fs-4">
                <img src={shareIcon} alt="Share code Button" /> Share Code
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="gameplanr-container">
            <div className="d-flex justify-content-between">
              <p className="me-"></p>
              <p className="fs-3 fw-bold">Your Team</p>
              <p className="fs-4 me-3 my-auto pb-3">Edit</p>
            </div>
            <div className="container my-3">
              <div className="card" style={{ position: "relative" }}>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2 justify-content-center">
                    <img
                      src={teamIcon}
                      alt="Team Logo"
                      className="me-2 team-logo"
                      style={{ width: "30px" }}
                    />
                    <h5 className="card-title mb-0 fs-2 fw-bold">
                      The Rockets
                    </h5>
                  </div>
                  <p className="card-text fs-4">
                    We are a co-ed team that loves to play for fun. We accept
                    those at all skill levels!
                  </p>
                  <div className="d-flex align-items-center">
                    <img src={membersIcon} alt="Members Logo" />
                    <span>1 Member</span>
                  </div>
                </div>
              </div>
              <h3 className="fs-3 fw-bold my-3">Let&apos;s get started!</h3>
              <div className="container ps-0">
                <div className="row">
                  <div className="col-4 m-2">
                    <img src={navbtn5} alt="" />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg full-width-button mt-5"
                onClick={() => setInviteFriends(true)}
              >
                Invite Friends to Join Team
              </button>
            </div>
          </div>
          <footer className="home-footer container-fluid px-0">
            <BottomNav />
          </footer>
        </>
      )}
    </>
  ); 
  
};
export default Team;