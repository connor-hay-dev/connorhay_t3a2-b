import React, { useState } from 'react';
import '../component-styling/sidebar.css'; 
import axios from "axios";


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
          <li><a href="/forum">Notice Board</a></li>
          <li><a href="/pomodoro">Pomodoro Timer</a></li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
