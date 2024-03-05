import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../goals.css';

const GoalsPage = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: "", content: "" });

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    } else {
      fetchGoals();
    }
  }, [cookies.token, navigate]);

  const fetchGoals = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/goals", {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
        withCredentials: true
      });
      setGoals(data);
    } catch (error) {
      toast.error("Failed to fetch goals.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/goals", newGoal, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
        withCredentials: true
      });
      toast.success("Goal added successfully!", {
        position: "top-center",
        autoClose: 5000,
      });
      fetchGoals(); // Refresh goals after adding
      setNewGoal({ title: "", content: "" }); // Reset form
    } catch (error) {
      toast.error("Failed to add goal.", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  // Function to update the status of a goal
  const updateGoalStatus = async (goalId, status) => {
    try {
      await axios.patch(`http://localhost:4000/goals/${goalId}`, { status }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
        withCredentials: true
      });
      toast.success("Goal status updated!", {
        position: "top-center",
        autoClose: 5000,
      });
      fetchGoals(); // Refresh goals after status update
    } catch (error) {
      toast.error("Failed to update goal status.", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <div className="goals-page">
        <h2>Goals</h2>
        <form onSubmit={handleSubmit} className="submit-goal-form">
          <input
            type="text"
            name="title"
            placeholder="Goal Title"
            value={newGoal.title}
            onChange={handleInputChange}
            required
            className="goal-title-input"
          />
          <textarea
            name="content"
            placeholder="Goal Description"
            value={newGoal.content}
            onChange={handleInputChange}
            required
            className="goal-content-textarea"
          />
          <button type="submit" className="submit-goal-button">Add Goal</button>
        </form>
        <div className="goals">
          {goals.map((goal) => (
            <div key={goal._id} className="goal">
              <h3>{goal.title}</h3>
              <p>{goal.content}</p>
              <button onClick={() => updateGoalStatus(goal._id, 'doing')} className="goal-doing-button">Doing</button>
              <button onClick={() => updateGoalStatus(goal._id, 'done')} className="goal-done-button">Done</button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default GoalsPage;
