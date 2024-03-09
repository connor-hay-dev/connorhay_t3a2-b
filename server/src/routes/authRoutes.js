const { Signup, Login, Logout } = require("../controllers/authController");
const { createPost, getPosts, deletePost } = require('../controllers/ForumController');
const { userVerification } = require("../middleware/authMiddleware");
const { createGoal, updateGoalStatus, getGoals, deleteGoal } = require("../controllers/GoalController");

const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.get('/logout', Logout)
router.post('/', userVerification);
router.post('/forum', userVerification, createPost);
router.get('/forum', getPosts);
router.delete('/forum/:id', userVerification, deletePost);
router.post('/goals', userVerification, createGoal);
router.get('/goals', userVerification, getGoals);
router.patch('/goals/:id', userVerification);
router.patch('/goals/:id/status', userVerification, updateGoalStatus);
router.delete('/goals/:id', userVerification, deleteGoal);

module.exports = router;
