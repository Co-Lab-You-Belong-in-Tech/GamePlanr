import { useState } from "react";
import { Link } from "react-router-dom";

const CreateTeam = () => {
  // Define the steps
  const steps = {
    START: "start",
    UPLOAD_PHOTO: "upload_photo",
    INVITE_FRIENDS: "invite_friends",
  };

  const [currentStep, setCurrentStep] = useState(steps.START);

  const [photoAdded, setPhotoAdded] = useState(false);

  // const [teamName, setTeamName] = useState("");

  // const [teamDesc, setTeamDesc] = useState("");

  const handleNext = () => {
    if (currentStep === steps.START) {
      setCurrentStep(steps.UPLOAD_PHOTO);
    } else if (currentStep === steps.UPLOAD_PHOTO) {
      setCurrentStep(steps.INVITE_FRIENDS);
    } 
  };

  const handleUploadPhoto = () => {
    // Set photo functionality
    setPhotoAdded(true);
  };

  const handleSkipPhoto = () => {
    setPhotoAdded(false);
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case steps.START:
        return (
          // <div className="container">
          //   {/* Form for creating a team */}
          //   <input placeholder="Your Team Name" />
          //   <textarea placeholder="Team Description" />
          // <button
          //   className="btn btn-primary btn-lg full-width-button"
          //   onClick={handleNext}
          // >
          //     Next
          //   </button>
          // </div>
          <div className="gameplanr-container">
            <div className="d-flex justify-content-between">
              <p></p>
              <p className="">Create a Team</p>
              <button className="close-button mb-3" aria-label="Close">
                &times;
              </button>
            </div>

            <h3 className="fs-3 fw-bold">Let&apos;s get started!</h3>
            <p className="">
              Name your team and tell us a bit about your squad
            </p>
            <div className="mb-3">
              <label htmlFor="teamNameInput" className="form-label">
                Team Name
              </label>
              <input
                type="text"
                className="form-control"
                // value={teamName}
                // onChange={setTeamName(this.value)}
                id="teamNameInput"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="teamDescTextarea" className="form-label">
                Team Description
              </label>
              <textarea
                className="form-control"
                id="teamDescTextarea"
                // value={teamDesc}
                // onChange={setTeamDesc(this.value)}
                rows="3"
              ></textarea>
            </div>
            <button
              className="btn btn-primary btn-lg full-width-button"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        );
      case steps.UPLOAD_PHOTO:
        return (
          <div>
            {photoAdded ? (
              <div>
                {/* Display the uploaded photo */}
                <img src="path_to_uploaded_image" alt="Team" />
                <button onClick={handleNext}>Next</button>
              </div>
            ) : (
              <div>
                {/* Option to upload a photo */}
                <button onClick={handleUploadPhoto}>Upload Photo</button>
                <button onClick={handleSkipPhoto}>Keep Existing Icon</button>
              </div>
            )}
          </div>
        );
      case steps.INVITE_FRIENDS:
        return (
          <div>
            {/* Interface to invite friends */}
            <p>Invite your friends by sharing the code below</p>
            <input value="THX-341" readOnly />
            <Link to="/schedule-game">Next</Link>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};
export default CreateTeam;
