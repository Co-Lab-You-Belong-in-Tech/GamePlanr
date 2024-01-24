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
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [playersNeeded, setPlayersNeeded] = useState("");
  const [opponent, setOpponent] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(duration,location,playersNeeded,opponent,notes)
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
      <form action="" onSubmit={handleSubmit}>
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
                value="20 min"
                onChange={(e) => setDuration(e.target.value)}
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option1">
                20 min
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                value="30 min"
                onChange={(e) => setDuration(e.target.value)}
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option2">
                30 min
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                value="45 min"
                onChange={(e) => setDuration(e.target.value)}
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option3">
                45 min
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option4"
                value="60 min"
                onChange={(e) => setDuration(e.target.value)}
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option4">
                60 min
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option5"
                value="90min"
                onChange={(e) => setDuration(e.target.value)}
              />
              <label className="btn btn-info fs-4 px-4" htmlFor="option5">
                90 min
              </label>
            </div>
            <div className="col-4 my-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option6"
                value="120 min"
                onChange={(e) => setDuration(e.target.value)}
              />
              <label
                className="btn btn-info fs-4 px-3"
                htmlFor="option6"
                style={{ width: "95px", height: "36px" }}
              >
                120 min
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
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="playersInput" className="form-label fs-4 mt-2">
          # Players needed (required)
        </label>
        <input
          type="text"
          className="form-control"
          id="playersInput"
          value={playersNeeded}
          onChange={(e) => setPlayersNeeded(e.target.value)}
        />
        <label htmlFor="oppnentInput" className="form-label fs-4 mt-2">
          Opponent
        </label>
        <input
          type="text"
          className="form-control"
          id="oppnentInput"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />
        <label htmlFor="notesInput" className="form-label fs-4 mt-2">
          Notes
        </label>
        <textarea
          type="text"
          className="form-control"
          id="notesInput"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
        />
        {startDate && duration && location && playersNeeded ? (
          <button
            className="btn btn-primary my-4 btn-lg full-width-button"
            type="submit"
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-light my-4 btn-lg full-width-button"
            type="submit"
            disabled
          >
            Next
          </button>
        )}
        <p className="fs-4 text-center">
          <Link
            to="/team"
            style={{ textDecoration: "none" }}
          >
            Skip
          </Link>
        </p>
      </form>
    </div>
  );
};
export default ScheduleGame;


CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};