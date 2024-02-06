import { useState } from "react";
import { Link } from "react-router-dom";
import teamIcon from "../assets/TeamIcon.png";
import membersIcon from "../assets/members-icon.png";
import navbtn5 from "../assets/navbtn5.png";

const JoinTeam = () => {

  const steps = {
    START: "start",
    CONFIRM_TEAM: "confirm_team",
  };


  const [code, setCode] = useState("");
  const [currentStep, setCurrentStep] = useState(steps.START);

  const handleNext = async () => {
    if (currentStep === steps.START) {
      setCurrentStep(steps.CONFIRM_TEAM);
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>Organized by:</span>
                      <img src={navbtn5} alt="" />
                      <div style={{}}></div>
                    </div>
                  </div>
                </div>

                <div
                  className="container-fluid"
                  style={{ bottom: "0", position: "fixed", width: "400px" }}
                >
                    <Link
                    to="/team"
                      className="btn btn-primary btn-lg me-5 mb-3"
                      style={{ width: "343px" }}
                    >
                      Join Team
                    </Link>
                  
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
