import React, { useState, useEffect } from 'react';
import '../pomodoro.css'
import Heading from '../components/heading';
import Sidebar from "../components/sidebar";
import { ToastContainer, toast } from "react-toastify";


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
  <>
    <Sidebar />
    <Heading text="Pomodoro Timer"/>
    <h4 className='instructions'>Use this timer to pace your study. Take a 5 minute break when the timer runs out!</h4>
    <div className="pomodoro-container">
      <div className="timer-display">{formatTime(secondsLeft)}</div>
      <button className="button" onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button className="button reset-button" onClick={reset}>Reset</button>
    </div>
    <ToastContainer />
  </>
);
};

export default Pomodoro;
