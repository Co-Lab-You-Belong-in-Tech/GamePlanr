import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backButton from "../assets/LeftButton.png";

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="form-select form-select-lg"
    style={{borderColor: "black"}}
    onClick={onClick}
    ref={ref}
  >
    {value || "Select date and time"}
  </button>
));

CustomInput.displayName = "CustomInput";

const ScheduleGame = () => {
  const [startDate, setStartDate] = useState(null);

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="gameplanr-container">
      <div className="d-flex justify-content-between">
        <img
          src={backButton}
          alt=""
          style={{ height: "20px" }}
          className="img-btn"
          onClick={goBack}
        />
        <p className="">Schedule a Game</p>
        <button className="close-button mb-3" aria-label="Close">
          &times;
        </button>
      </div>
      <h3 className="fs-3 fw-bold">Time to hit the field!</h3>
      <p className="">schedule your first game and let the fun begin</p>
      <form action="">
        <label htmlFor="datePickerInput" className="form-label fs-4">
          Date and Time (Required)
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          id="datePickerInput"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          customInput={<CustomInput />}
        />
        <label htmlFor="durationInput" className="form-label fs-4 mt-2">
          Duration (required)
        </label>
        <div
          className="container text-center p-0 justify-content-evenly"
          id="durationInput"
        >
          <div className="row">
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autoComplete="off"
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option1">
                Checked
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                autoComplete="off"
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option2">
                Checked
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                autoComplete="off"
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option3">
                Checked
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option4"
                autoComplete="off"
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option4">
                Checked
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option5"
                autoComplete="off"
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option5">
                Checked
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option6"
                autoComplete="off"
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option6">
                Checked
              </label>
            </div>
          </div>
        </div>
        <div id="form"></div>
        <label htmlFor="locationInput" className="form-label fs-4 mt-2">
          Location (required)
        </label>
        <input
          type="text"
          className="form-control"
          id="locationInput"
          value=""
          onChange=""
        />
        <label htmlFor="playersInput" className="form-label fs-4 mt-2">
          # Players needed (required)
        </label>
        <input
          type="text"
          className="form-control"
          id="playersInput"
          value=""
          onChange=""
        />
        <label htmlFor="oppnentInput" className="form-label fs-4 mt-2">
          Opponent
        </label>
        <input
          type="text"
          className="form-control"
          id="oppnentInput"
          value=""
          onChange=""
        />
        <label htmlFor="notesInput" className="form-label fs-4 mt-2">
          Notes
        </label>
        <textarea
          type="text"
          className="form-control"
          id="notesInput"
          value=""
          onChange=""
          rows="3"
        />
        {/* {(teamName.length > 0) & (teamDesc.length > 0) ? ( 
        //   <button
        //     className="btn btn-primary btn-lg full-width-button"
        //     onClick={handleNext}
        //   >
        //     Next
        //   </button>
        // ) : (
        //   <button
        //     className="btn btn-light btn-lg full-width-button"
        //     onClick={handleNext}
        //     disabled
        //   >
        //     Next
        //   </button>
        //  )}*/}
      </form>
    </div>
  );
};
export default ScheduleGame;


CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};