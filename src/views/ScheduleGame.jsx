import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createGameInDatabase } from "../services/GamesService";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backButton from "../assets/LeftButton.png";
import { useTeam } from '../context/TeamContext';
import { useGames } from "../context/GamesContext";

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="form-select"
    style={{color: "#595859"}}
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
  const [playersNeeded, setPlayersNeeded] = useState(11);
  const [opponent, setOpponent] = useState("");
  const [notes, setNotes] = useState("");
  const { team } = useTeam();
  const { updateGames } = useGames()

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  const handleScheduleGame = async () => {
    try {
      // Create game object with form data
      const gameData = {
        TeamCode: team.Team_Code,
        startDate,
        duration,
        location,
        playersNeeded,
        opponent,
        notes,
      };
      // Create game in Database and get id for game just created
      const gameId = await createGameInDatabase(gameData);
      // Add the gameId to the gameData object
      gameData.gameId = gameId;
      console.log('Game scheduled successfully', gameData);
      // Set the GamesContext
      updateGames(gameData)
      // Navigate back to Home Screen
      navigate(`/home?state=team_created_games_scheduled`);
    } catch (error) {
      console.error('Error scheduling game:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(duration,location,playersNeeded,opponent,notes)
  }



  return (
    <div className="gameplanr-container pb-1 px-2 pt-3">
      <div className="d-flex justify-content-between">
        <img
          src={backButton}
          alt=""
          style={{ height: "20px" }}
          className="img-btn"
          onClick={goBack}
        />
        <p className="">Schedule a Game</p>
        <Link
          to="/home"
          className="close-button mb-3 link-underline link-underline-opacity-0"
          aria-label="Close"
        >
          &times;
        </Link>
      </div>
      <h3 className="fs-3 fw-bold">Time to hit the field!</h3>
      <p className="">schedule your first game and let the fun begin</p>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="datePickerInput" className="form-label fs-4">
          Date and Time{" "}
          <span className="fw-bold" style={{ color: "#595859" }}>
            (required)
          </span>
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
          Duration{" "}
          <span className="fw-bold" style={{ color: "#595859" }}>
            (required)
          </span>
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
              <label
                className="btn btn-info fs-4 px-4"
                htmlFor="option1"
                style={{ height: "48px", paddingTop: "12px", width: "105px" }}
              >
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
              <label
                className="btn btn-info fs-4 px-4"
                htmlFor="option2"
                style={{ height: "48px", paddingTop: "12px", width: "105px" }}
              >
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
              <label
                className="btn btn-info fs-4 px-4"
                htmlFor="option3"
                style={{ height: "48px", paddingTop: "12px", width: "105px" }}
              >
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
              <label
                className="btn btn-info fs-4 px-4"
                htmlFor="option4"
                style={{ height: "48px", paddingTop: "12px", width: "105px" }}
              >
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
              <label
                className="btn btn-info fs-4 px-4"
                htmlFor="option5"
                style={{ height: "48px", paddingTop: "12px", width: "105px" }}
              >
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
                style={{ height: "48px", paddingTop: "12px", width: "105px" }}
              >
                120 min
              </label>
            </div>
          </div>
        </div>
        <div id="form"></div>
        <label htmlFor="locationInput" className="form-label fs-4 mt-2">
          Location{" "}
          <span className="fw-bold" style={{ color: "#595859" }}>
            (required)
          </span>
        </label>
        <input
          type="text"
          className="form-control"
          id="locationInput"
          placeholder="Enter location"
          style={{ color: "#595859" }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="playersInput" className="form-label fs-4 mt-2">
          # Players needed{" "}
          <span className="fw-bold" style={{ color: "#595859" }}>
            (required)
          </span>
        </label>
        <input
          type="number"
          className="form-control"
          id="playersInput"
          placeholder="How many players are needed?"
          style={{ color: "#595859" }}
          value={playersNeeded}
          onChange={(e) => setPlayersNeeded(parseInt(e.target.value))}
        />
        <label htmlFor="oppnentInput" className="form-label fs-4 mt-2">
          Opponent
        </label>
        <input
          type="text"
          className="form-control"
          id="oppnentInput"
          placeholder="Who are you playing?"
          style={{ color: "#595859" }}
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
          placeholder="Any notes for your team?"
          style={{ color: "#595859" }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
        />
        {startDate && duration && location && playersNeeded ? (
          <button
            className="btn btn-primary my-4 btn-lg full-width-button"
            type="submit"
            onClick={handleScheduleGame}
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
          <Link to="/team" style={{ textDecoration: "none" }}>
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