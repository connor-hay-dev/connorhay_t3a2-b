import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../goals.css';
import Sidebar from "../components/sidebar";
import Heading from '../components/heading'; // Adjust the path based on your file structure

const GoalsPage = () => {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({ description: "", details: "", endDate: "" });

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
                setNewGoal({ description: "", details: "", endDate: "" }); // Reset form
            } catch (error) {
                toast.error("Failed to add goal.", {
                    position: "bottom-left",
                    autoClose: 5000,
                });
            }
    };

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
            console.log(error.message)
            toast.error("Failed to update goal status.", {
                position: "bottom-left",
                autoClose: 5000,
            });
        }
    };

    const deleteGoal = async (goalId) => {
        try {
            await axios.delete(`http://localhost:4000/goals/${goalId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                },
                withCredentials: true
            });
            toast.success("Goal deleted successfully!", {
                position: "top-center",
                autoClose: 5000,
            });
            fetchGoals(); // Refresh goals after deletion
        } catch (error) {
            console.log(error.message)
            toast.error("Failed to delete goal.", {
                position: "bottom-left",
                autoClose: 5000,
            });
        }
    };

    return (
        <>
            <Sidebar />
            <Heading text="Goals"/>
            <div className="goals-page">
                <form onSubmit={handleSubmit} className="submit-goal-form">
                    <textarea
                        name="description"
                        placeholder="Goal Description"
                        value={newGoal.description}
                        onChange={handleInputChange}
                        required
                        className="goal-description-textarea"
                    />
                    <input
                        type="text"
                        name="details"
                        placeholder="Additional Details"
                        value={newGoal.details}
                        onChange={handleInputChange}
                        className="goal-details-input"
                    />
                    <p className="finishBy">Finish by:</p>
                    <input
                        type="date"
                        name="endDate"
                        value={newGoal.endDate}
                        onChange={handleInputChange}
                        required
                        className="goal-enddate-input"
                    />
                    <button type="submit" className="submit-goal-button">Add Goal</button>
                </form>
                <div className="goals">
                    {goals.map((goal) => (
                        <div key={goal._id} className="goal">
                            <p>{goal.description}</p>
                            <div className="goal-actions">
                            <button 
                                onClick={() => updateGoalStatus(goal._id, 'pending')}
                                className={`goal-status-button ${goal.status === 'pending' ? 'active' : ''}`}
                            >
                                Pending
                            </button>
                            <button 
                                onClick={() => updateGoalStatus(goal._id, 'in progress')}
                                className={`goal-status-button ${goal.status === 'in progress' ? 'active' : ''}`}
                            >
                                In Progress
                            </button>
                            <button 
                                onClick={() => updateGoalStatus(goal._id, 'completed')}
                                className={`goal-status-button ${goal.status === 'completed' ? 'active' : ''}`}
                            >
                                Completed
                            </button>
                            <button 
                                onClick={() => deleteGoal(goal._id)}
                                className="delete-goal-button"
                            >
                            Delete
                    </button>
                        </div>
                        </div>     
                    ))}
                </div>
            </div>
            <ToastContainer />
        </>
    );

};

export default GoalsPage;

