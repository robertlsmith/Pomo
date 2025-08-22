import { useState } from "react";
import "../styles/Pomodoro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRefresh } from "@fortawesome/free-solid-svg-icons";

const Pomodoro = () => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progressStep, setProgressStep] = useState(0);

  const steps = ["Working", "Short Break", "Long Break", "Done"];

  return (
    <div className="pomodoro-container">
      <h1 className="text-4xl font-bold text-(--pomodoro-text)">Pomo</h1>
      <p>{steps}</p>

      <h2>Time Remaining:</h2>
      <div className="bg-(--pomodoro-secondary) p-4 rounded-lg ">
        <h1 className="text-8xl font-bold">00:00</h1>
      </div>
      <div className="button-group">
        <button className="btn">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className="btn">
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button className="reset-btn">
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
