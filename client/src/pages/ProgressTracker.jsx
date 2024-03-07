import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../progressTracker.css'; // Make sure to create appropriate CSS
import Heading from '../components/heading';
import Sidebar from "../components/sidebar";
import StudyProgressGraph from '../components/studyprogressgraph';



const ProgressTrackerPage = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const [progressRecords, setProgressRecords] = useState([]);
  const [newProgress, setNewProgress] = useState({
    subject: "",
    topics: [],
    topicsDetail: [],
    wordsStudied: 0,
    hoursSpent: 0,
    date: ""
  });

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    } else {
      fetchProgress();
    }
  }, [cookies.token, navigate]);

  const fetchProgress = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/progress", {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
        withCredentials: true
      });
      setProgressRecords(data);
    } catch (error) {
      toast.error("Failed to fetch progress records.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgress(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/progress", newProgress, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
        withCredentials: true
      });
      toast.success("Progress added successfully!", {
        position: "top-center",
        autoClose: 5000,
      });
      fetchProgress(); // Refresh progress records after adding
      setNewProgress({ subject: "", topics: [], topicsDetail: [], wordsStudied: 0, hoursSpent: 0, date: "" }); // Reset form
    } catch (error) {
      toast.error("Failed to add progress.", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
    // const [studyData, setStudyData] = useState([]);

    // useEffect(() => {
    //   const fetchStudyData = async () => {
    //     try {
    //       // Adjust the endpoint as needed based on your API structure
    //       const { data } = await axios.get('http://localhost:4000/progress', {
    //         headers: {
    //           // Include the authentication token if your API requires it
    //           Authorization: `Bearer ${cookies.token}`,
    //         },
    //       });
    //       setStudyData(data);
    //     } catch (error) {
    //       console.error("Failed to fetch study data", error);
    //     }
    //   };
  
    //   fetchStudyData();
    // }, []);
  
    
  };

  // Assuming similar sidebar and logout logic is used
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Sidebar and other UI components */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />    
      <div className="progress-tracker-page">
        <Heading text="Study Tracker" />
        <form onSubmit={handleSubmit} className="submit-progress-form">
          {/* Form fields for newProgress data entry */}
          {/* Example for subject and hoursSpent: */}
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={newProgress.subject}
            onChange={handleInputChange}
            required
            className="progress-subject-input"
          />
          <div>
            <p>Hours Spent:</p>
          </div>
          <input
            type="number"
            name="hoursSpent"
            placeholder="Hours Spent"
            value={newProgress.hoursSpent}
            onChange={handleInputChange}
            required
            className="progress-hours-input"
          />
          <p>Words Studied:</p>
          <input
            type="number"
            name="wordsLearnt"
            placeholder="Words Learnt"
            value={newProgress.wordsStudied}
            onChange={handleInputChange}
            required
            className="words-learnt"
          />
          <button type="submit" className="submit-progress-button">Add Progress</button>
        </form>
        {/* <StudyProgressGraph studyData={studyData} /> */}
        <div className="progress-records">
          {/* Map and display progressRecords similarly to goals */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProgressTrackerPage;
