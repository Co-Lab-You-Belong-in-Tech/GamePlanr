import { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../assets/edit-button.png";
import teamPhoto from "../assets/TeamIcon.png";
import redIcon from "../assets/TeamIconRed.png";
import blueIcon from "../assets/TeamIconBlue.png";
import orangeIcon from "../assets/TeamIconOrange.png";
import yellowIcon from "../assets/TeamIconYellow.png";
import greenIcon from "../assets/TeamIconGreen.png";
import backButton from "../assets/LeftButton.png";
import copyIcon from "../assets/copyIcon.png";
import shareIcon from "../assets/shareIcon.png";

const CreateTeam = () => {
  // Define the steps
  const steps = {
    START: "start",
    INVITE_FRIENDS: "invite_friends",
  };

  const [currentStep, setCurrentStep] = useState(steps.START);

  const [chooseIcon, setChooseIcon] = useState(false);

  const [chosenIcon, setChosenIcon] = useState(teamPhoto);


  const [teamName, setTeamName] = useState("");

  const [teamDesc, setTeamDesc] = useState("");

  const handleNext = () => {
    if (currentStep === steps.START) {
      setCurrentStep(steps.INVITE_FRIENDS);
    } 
  };

  // const handleBack = () => {
  //   if (currentStep === steps.INVITE_FRIENDS) {
  //     setCurrentStep(steps.START);
  //   }
  // };

  const edit = (editState) => {
    setChooseIcon(editState)
  }

  const handleIconPick = (icon) => {
    setChosenIcon(icon)
    setChooseIcon(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case steps.START:
        return (
          <>
            {chooseIcon ? (
              <div className="gameplanr-container">
                <div className="d-flex justify-content-between">
                  <img
                    src={backButton}
                    alt=""
                    style={{ height: "20px" }}
                    className="img-btn"
                    onClick={() => edit(false)}
                  />
                  <p className="">Choose Team Icon</p>
                  <p className="ms-4 ps-1"></p>
                </div>
                <h3 className="fs-3 fw-bold">Show off your team spirit!</h3>
                <p className="">
                  Choose an icon to display your team&apos;s style
                </p>
                <div className="container ps-0">
                  <div className="row">
                    <div className="col m-2">
                      <img
                        src={teamPhoto}
                        className="img-btn"
                        alt="icon1"
                        onClick={() => handleIconPick(teamPhoto)}
                      />
                    </div>
                    <div className="col m-2">
                      <img
                        src={redIcon}
                        className="img-btn"
                        alt="icon2"
                        onClick={() => handleIconPick(redIcon)}
                      />
                    </div>
                    <div className="col m-2">
                      <img
                        src={blueIcon}
                        className="img-btn"
                        alt="icon3"
                        onClick={() => handleIconPick(blueIcon)}
                      />
                    </div>
                    <div className="col m-2">
                      <img
                        src={orangeIcon}
                        className="img-btn"
                        alt="icon4"
                        onClick={() => handleIconPick(orangeIcon)}
                      />
                    </div>
                    <div className="col m-2">
                      <img
                        src={yellowIcon}
                        className="img-btn"
                        alt="icon5"
                        onClick={() => handleIconPick(yellowIcon)}
                      />
                    </div>
                    <div className="col m-2">
                      <img
                        src={greenIcon}
                        className="img-btn"
                        alt="icon6"
                        onClick={() => handleIconPick(greenIcon)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gameplanr-container">
                <div className="d-flex justify-content-between">
                  <p className="me-2"></p>
                  <p className="">Create a Team</p>
                  <Link
                    to="/home"
                    className="close-button mb-3 link-underline link-underline-opacity-0"
                    aria-label="Close"
                  >
                    &times;
                  </Link>
                </div>
                <h3 className="fs-3 fw-bold">Let&apos;s get started!</h3>
                <p className="">
                  Name your team and tell us a bit about your squad
                </p>
                <div className="icon-container d-flex justify-content-center my-3">
                  <img
                    src={chosenIcon}
                    alt="Team Photo"
                    className="background-icon mx-auto"
                  />
                  <img
                    src={editIcon}
                    alt="Edit Icon"
                    className="edit-icon img-btn"
                    onClick={() => edit(true)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamNameInput" className="form-label">
                    Team Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamDescTextarea" className="form-label">
                    Team Description
                  </label>
                  <textarea
                    className="form-control"
                    id="teamDescTextarea"
                    value={teamDesc}
                    onChange={(event) => setTeamDesc(event.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                {(teamName.length > 0) & (teamDesc.length > 0) ? (
                  <button
                    className="btn btn-primary btn-lg full-width-button"
                    onClick={handleNext}
                  >
                    Create Team
                  </button>
                ) : (
                  <button
                    className="btn btn-light btn-lg full-width-button"
                    onClick={handleNext}
                    disabled
                  >
                    Create Team
                  </button>
                )}
              </div>
            )}
          </>
        );
      case steps.INVITE_FRIENDS:
        return (
          <div className="gameplanr-container">
            <div className="d-flex justify-content-between">
              <p className="me-2"></p>
              <p className="">Invite your Friends</p>
              <Link
                to="/home"
                className="close-button mb-3 link-underline link-underline-opacity-0"
                aria-label="Close"
              >
                &times;
              </Link>
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
                  value="xxxxxxxxxxxxxxxxxxxx"
                  className="mx-auto text-center px-5 py-4"
                  readOnly
                />
              </div>
              <div className="row justify-content-center mt-4">
                <p className="col-4 fs-4" style={{ color: "#445b9f" }}>
                  <img src={copyIcon} alt="Copy Code Button" /> Copy Code
                </p>
                <p className="col-4 fs-4" style={{ color: "#445b9f" }}>
                  <img
                    src={shareIcon}
                    alt="Share code Button"
                  />{" "}
                  Share Code
                </p>
              </div>
            </div>

            <Link
              to="/schedule-game"
              className="btn btn-primary btn-lg full-width-button"
            >
              Next
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};
export default CreateTeam;
