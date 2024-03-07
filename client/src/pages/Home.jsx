// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import '../home.css'
// import Heading from '../components/heading';
// import Sidebar from "../components/sidebar";


// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false); // new
//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       const { data } = await axios.post(
//         "http://localhost:4000/",
//         {},
//         { withCredentials: true }
//       );
//       const { status, user } = data;
//       setUsername(user);
//       return status
//         ? toast(`Hello ${user}`, {
//             position: "top-right",
//           })
//         : (removeCookie("token"), navigate("/login"));
//     };
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);
//   const Logout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen); //new

//   return (
//     <>
//       <Heading text="Home" />
//       <div className="burger_menu" onClick={toggleSidebar}>☰</div>
//             {sidebarOpen && (
//               <div className="sidebar">
//                 <div className="closebtn" onClick={toggleSidebar}>×</div>
//                 <a href="localhost:40000/home" onClick={toggleSidebar}>Home</a>
//                 <a href="localhost:40000/goals" onClick={toggleSidebar}>Goals</a>
//                 <a href="localhost:40000/pomodoro" onClick={toggleSidebar}>Pomodoro Timer</a>
//                 <a href="localhost:40000/forum" onClick={toggleSidebar}>Forum</a>
//                 <a href="localhost:40000/signup" onClick={Logout}>Logout</a>
//                 {/* Add more links or content here */}
//               </div>
//             )}

//       <div className="home_page">
//         <h4>
//           {" "}
//           Welcome <span>{username}</span>
//         </h4>
//         <button onClick={Logout}>LOGOUT</button>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default Home;

// // import React, { useEffect, useState } from "react";
// // import { useCookies } from "react-cookie";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";

// // const Home = () => {
// //   const [cookies] = useCookies(['token']);
// //   const navigate = useNavigate();
// //   const [userName, setUserName] = useState('');

// //   useEffect(() => {
// //     // Redirect to login if no token is found
// //     if (!cookies.token) {
// //       navigate("/login");
// //     } else {
// //       fetchUserDetails();
// //     }
// //   }, [cookies, navigate]);

// //   const fetchUserDetails = async () => {
// //     try {
// //       const { data } = await axios.get("http://localhost:4000/user", {
// //         headers: {
// //           Authorization: `Bearer ${cookies.token}`
// //         },
// //         withCredentials: true
// //       });
// //       if (data.success) {
// //         setUserName(data.user.name);
// //       } else {
// //         toast.error(data.message, {
// //           position: "bottom-left",
// //           autoClose: 5000,
// //         });
// //         navigate("/login");
// //       }
// //     } catch (error) {
// //       toast.error("There was an error verifying your details.", {
// //         position: "bottom-left",
// //         autoClose: 5000,
// //       });
// //       navigate("/login");
// //     }
// //   };

// //   return (
// //     <div className="home-container">
// //       {userName ? (
// //         <>
// //           <h1>Welcome, {userName}</h1>
// //           <p>We're glad you're here. Explore our features and enjoy your stay!</p>
// //         </>
// //       ) : (
// //         <p>Verifying user...</p>
// //       )}
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../home.css"; // Update the path as necessary

const Home = () => {
  const [cookies, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.post(
          "http://localhost:4000/",
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const { status, user } = data;
        if (status) {
          setUsername(user); // Assuming 'user' here is a username or user ID
          toast.success(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          throw new Error("Verification failed");
        }
      } catch (error) {
        toast.error("Session invalid, please log in again.", {
          position: "top-right",
        });
        removeCookie("token", { path: '/' }); // Adjust as needed to match how the cookie was set
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("token", { path: '/' });
    navigate("/login"); // Navigate to login after logout instead of signup for consistency
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Application</h1>
      <p>{username && `Hello, ${username}`}</p>
      <button onClick={logout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
