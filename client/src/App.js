import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForumPage from "./pages/Forum";
import Pomodoro from "./pages/PomodoroTimer";
import GoalsPage from "./pages/Goals";
import ProgressTrackerPage from "./pages/ProgressTracker";
// import { Pomodoro } from "./PomodoroTimer";
// import { ProgressTracker } from "./ProgressTracker";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/progress" element={<ProgressTrackerPage />} />
      </Routes>
    </div>
  );
}

export default App;