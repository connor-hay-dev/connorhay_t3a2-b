import React, { useState, useEffect } from 'react';
import '../pomodoro.css'

const Pomodoro = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1);
      }, 1000);
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setSecondsLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="pomodoro-container">
      <h2>Pomodoro Timer</h2>
      <div className="timer-display">{formatTime(secondsLeft)}</div>
      <button className="button" onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button className="button reset-button" onClick={reset}>Reset</button>
    </div>
  );
};

export default Pomodoro;
