import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(['token']);

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar();
  };

  const Logout = () => {
    removeCookie("token");
    handleNavigation("/signup");
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar">
          <div className="closebtn" onClick={toggleSidebar}>×</div>
          <a onClick={() => handleNavigation("/home")}>Home</a>
          <a onClick={() => handleNavigation("/goals")}>Goals</a>
          <a onClick={() => handleNavigation("/pomodoro")}>Pomodoro Timer</a>
          <a onClick={() => handleNavigation("/forum")}>Forum</a>
          <a onClick={Logout}>Logout</a>
        </div>
      )}
    </>
  );
};

export default Sidebar;