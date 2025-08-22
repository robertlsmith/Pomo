import { useEffect, useRef, useState } from "react";
import "../styles/Pomodoro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRefresh } from "@fortawesome/free-solid-svg-icons";

const Pomodoro = () => {
  const steps = ["Working", "Short Break", "Long Break", "Done"];
  const workTime = 25 * 60;
  const shortBreakTime = 5 * 60;
  const longBreakTime = 30 * 60;
  const cyclesRemaining = 4;

  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(workTime);
  const [progressStep, setProgressStep] = useState("Working");
  const [cycleCount, setCycleCount] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerStarted) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleCompletedStep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerStarted]);

  const handleCompletedStep = () => {
    clearInterval(intervalRef.current);
    setTimerStarted(false);

    if (progressStep === "Working") {
      const newCycleCount = cycleCount + 1;
      setCycleCount(newCycleCount);

      if (newCycleCount % cyclesRemaining === 0) {
        setProgressStep("Long Break");
        setTimeRemaining(longBreakTime);
      } else {
        setProgressStep("Short Break");
        setTimeRemaining(shortBreakTime);
      }
    } else {
      setProgressStep("Working");
      setTimeRemaining(workTime);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimerStarted(false);
    setTimeRemaining(workTime);
    setProgressStep("Working");
    setCycleCount(0);
  };

  return (
    <div className="pomodoro-container">
      <h1 className="text-4xl font-bold text-(--pomodoro-text)">Pomo</h1>
      <p>{progressStep}</p>

      <h2>Time Remaining:</h2>
      <div className="bg-(--pomodoro-secondary) p-4 rounded-lg ">
        <h1 className="text-8xl font-bold" aria-label="time-display">
          {Math.floor(timeRemaining / 60)}:
          {String(timeRemaining % 60).padStart(2, "0")}
        </h1>
      </div>
      <div className="button-group">
        <button className="btn" onClick={() => setTimerStarted(true)} aria-label="Start">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className="btn" onClick={() => setTimerStarted(false)} aria-label="Pause">
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button
          className="reset-btn"
          onClick={() => {
            handleReset();
          }}
          aria-label="Reset"
        >
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
