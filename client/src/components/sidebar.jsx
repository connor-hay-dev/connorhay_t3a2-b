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
import axios from "axios";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { Logout } from '../../../server/src/controllers/authController';


const Sidebar = () => {
  const handleLogout = async () => {
    try {
      // Replace '/api/logout' with your actual logout route
      const response = await axios.get('http://localhost:4000/logout', { withCredentials: true });
      alert(response.data.message); // Or use a more sophisticated way to display the message
      // Redirect the user to login page or any other page after successful logout
      window.location.href = '/login'; // This redirects the user to the login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle errors, maybe show a message to the user
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // const handleLogout = async () => {
  //   // Call your backend to invalidate the user session/token if necessary
  //   try {
  //     const response = await fetch('/logout', { method: 'POST' }); // Adjust the API endpoint as necessary
  //     const data = await response.json();
  //     console.log(data.message); // Log the response message
      
  //     // Clear authentication token from localStorage/cookies here if used
  //     // localStorage.removeItem('token'); // Example for localStorage
  //     // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Example for cookies

  //     // Redirect user to login page or update UI/State as needed
  //     // This depends on your routing setup, e.g., using window.location or history from react-router-dom
  //     window.location.href = '/login'; // Example redirection
  //   } catch (error) {
  //     console.error('Logout failed', error);
  //   }
  // };

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
          <li><a href="/pomodoro">Pomodoro Timer</a></li>
          {/* <li><a href="/logout">Logout</a></li> */}
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
