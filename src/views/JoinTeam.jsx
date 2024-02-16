import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import membersIcon from "../assets/members-icon.png";
import { getTeamByCode, joinTeam } from "../services/TeamService"
import { useUserProfile } from "../context/UserProfileContext";
import { useTeam } from '../context/TeamContext';
import { useGames } from "../context/GamesContext";
import { getGamesData } from "../services/GamesService";

const JoinTeam = () => {

  const steps = {
    START: "start",
    CONFIRM_TEAM: "confirm_team",
  };


  const [code, setCode] = useState("");
  let [teamData, setTeamData] = useState(null);
  const [currentStep, setCurrentStep] = useState(steps.START);
  const { userProfile, updateUserProfile } = useUserProfile();
  const { updateTeam } = useTeam();
  const { updateGames } = useGames();
  const navigate = useNavigate();



  const handleNext = async () => {
    if (currentStep === steps.START) {
      if (code) {
        const teamData = await getTeamByCode(code);
        if (teamData) {
          setTeamData(teamData);
          setCurrentStep(steps.CONFIRM_TEAM);
        } else {
          console.log("Team not found!");
        }
      }
    }
  };

  const handleJoinTeam = async () => {
    if (teamData) {
      const updatedUserProfile = { ...userProfile, Team_Code: teamData.Team_Code };
      updateUserProfile(updatedUserProfile);

      teamData = await joinTeam(teamData.Team_Code, userProfile.userID); 
      updateTeam(teamData);
      
      // Fetch games data only if teamData's Games array is greater than 0
      if (teamData.Games.length > 0) {
        const gamesData = await getGamesData(updatedUserProfile.Team_Code);
        updateGames(gamesData);
      }
      navigate('/team')
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case steps.START:
        return (
          <>
            <div className="gameplanr-container px-2 pt-3">
              <div className="text-center">
                <p className="">Join a Team</p>
              </div>
              <h3 className="fs-3 fw-bold">
                Enter your team&apos;s code below to get started!
              </h3>
              <p className="">Let the games begin!</p>
              <div className="container text-center my-5">
                <div className="reg-border">
                  <input
                    value={code}
                    className="mx-auto text-center fw-bold fs-1 px-5 py-5"
                    onChange={(event) => setCode(event.target.value)}
                  />
                </div>
              </div>

              <div
                className="container-fluid"
                style={{ bottom: "0", position: "fixed", width: "400px" }}
              >
                {code.length > 0 ? (
                  <button
                    className="btn btn-primary btn-lg me-5 mb-3"
                    style={{ width: "343px" }}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="btn btn-light btn-lg me-5 mb-3"
                    style={{ width: "343px" }}
                    onClick={handleNext}
                    disabled
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        );
      case steps.CONFIRM_TEAM:
        return (
          <>
            <div className="gameplanr-container">
              <div className="d-flex justify-content-between m-2">
                <p className="me-2"></p>
                <p className="">Confirm Team</p>
                <Link
                  to="/home"
                  className="close-button mb-3 link-underline link-underline-opacity-0"
                  aria-label="Close"
                >
                  &times;
                </Link>
              </div>
              <div className="container my-3">
                <div className="card" style={{ position: "relative" }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2 justify-content-center">
                      <img
                        src={teamData.Team_Icon}
                        alt="Team Logo"
                        className="me-2 team-logo"
                        style={{ width: "30px" }}
                      />
                      <h5 className="card-title mb-0 fs-2 fw-bold">
                        {teamData.Team_Name}
                      </h5>
                    </div>
                    <p className="card-text fs-4">
                      {teamData.Team_Description}
                    </p>
                    <div className="d-flex align-items-center">
                      <img src={membersIcon} alt="Members Logo" />
                      <span>{teamData.membersCount} Members</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>Organized by: {teamData.captainDisplayName}</span>
                      <img src={teamData.captainPhotoURL} alt="" />
                      <div style={{}}></div>
                    </div>
                  </div>
                </div>
                <div
                  className="container-fluid"
                  style={{ bottom: "0", position: "fixed", width: "400px" }}
                >
                  <button
                    className="btn btn-primary btn-lg me-5 mb-3"
                    style={{ width: "343px" }}
                    onClick={handleJoinTeam}
                  >
                    Join Team
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }



    
  };
  return <div>{renderStep()}</div>;
};
  export default JoinTeam;
