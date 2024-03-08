// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const [, removeCookie] = useCookies(['token']);

//   const handleNavigation = (path) => {
//     navigate(path);
//     toggleSidebar();
//   };

//   const Logout = () => {
//     removeCookie("token");
//     handleNavigation("/signup");
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="sidebar">
//           <div className="closebtn" onClick={toggleSidebar}>×</div>
//           <a onClick={() => handleNavigation("/home")}>Home</a>
//           <a onClick={() => handleNavigation("/goals")}>Goals</a>
//           <a onClick={() => handleNavigation("/pomodoro")}>Pomodoro Timer</a>
//           <a onClick={() => handleNavigation("/forum")}>Forum</a>
//           <a onClick={Logout}>Logout</a>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import '../component-styling/sidebar.css'; // Assuming you have a separate CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className="burger-menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="close-button" onClick={toggleSidebar}>×</button>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/goals">Goals</a></li>
          <li><a href="/forum">Forum</a></li>
          <li><a href="/progress">Progress Tracker</a></li>
          <li><a href="/pomodoro">Pomodoro Timer</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
