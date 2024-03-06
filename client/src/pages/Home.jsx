import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import '../home.css'

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // new
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); //new

  return (
    <>
      
      <div className="burger_menu" onClick={toggleSidebar}>☰</div>
            {sidebarOpen && (
              <div className="sidebar">
                <div className="closebtn" onClick={toggleSidebar}>×</div>
                <a href="localhost:40000/home" onClick={toggleSidebar}>Home</a>
                <a href="localhost:40000/goals" onClick={toggleSidebar}>Goals</a>
                <a href="localhost:40000/pomodoro" onClick={toggleSidebar}>Pomodoro Timer</a>
                <a href="localhost:40000/forum" onClick={toggleSidebar}>Forum</a>
                <a href="localhost:40000/signup" onClick={Logout}>Logout</a>
                {/* Add more links or content here */}
              </div>
            )}

      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;