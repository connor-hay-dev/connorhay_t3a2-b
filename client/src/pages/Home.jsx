// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../home.css";

// const Home = () => {
//   const [cookies, removeCookie] = useCookies(['token']);
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000/",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${cookies.token}`,
//             },
//             withCredentials: true,
//           }
//         );
//         const { status, user } = data;
//         if (status) {
//           setUsername(user);
//           toast.success(`Hello ${user}`, {
//             position: "top-right",
//           });
//         } else {
//           throw new Error("Verification failed");
//         }
//       } catch (error) {
//         toast.error("Session invalid, please log in again.", {
//           position: "top-right",
//         });
//         removeCookie("token", { path: '/' });
//         navigate("/login");
//       }
//     };
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);

//   const logout = () => {
//     removeCookie("token", { path: '/' });
//     navigate("/login"); 
//   };

//   return (
//     <div className="home-container">
//       <h1>Welcome to the Application</h1>
//       <p>{username && `Hello, ${username}`}</p>
//       <button onClick={logout}>Logout</button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar'; // Adjust the path based on your file structure
import Heading from '../components/heading'; // Adjust the path based on your file structure
import '../home.css'; // Assuming you have or will create styling specifically for the Home page

const HomePage = () => {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    useEffect(() => {
        if (!cookies.token) {
            navigate("/login");
        }
        // Additional setup can be done here if needed
    }, [cookies.token, navigate]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Sidebar />
            <Heading text="Home"/>
            <div className="home-page">
                <div className="welcome-message">
                    <h2>Hello, welcome back!</h2>
                    <p>We're glad to see you again. Check out your goals or add new ones to stay on track!</p>
                </div>
            </div>
        </>
    );
};

export default HomePage;

