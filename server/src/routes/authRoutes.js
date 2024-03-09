const { Signup, Login, Logout } = require("../controllers/authController");
const { createPost, getPosts, deletePost } = require('../controllers/ForumController');
const { userVerification } = require("../middleware/authMiddleware");
const { createGoal, updateGoalStatus } = require("../controllers/GoalController"); // import status setting
const { getGoals, deleteGoal } = require("../controllers/GoalController");
const { createProgress, getAllProgress, getProgressById, getAllProgressForUser, updateProgress, deleteProgress, getCumulativeWordsStudied } = require("../controllers/ProgressTrackerController");
// const { createProgress } = require('../controllers/ProgressTrackerController')
// const pomodoroController = require('../controllers/PomodoroController');

const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.get('/logout', Logout)
router.post('/', userVerification);
router.post('/forum', userVerification, createPost);
router.get('/forum', getPosts);
router.delete('/forum/:id', userVerification, deletePost);
// router.post('/forum/:postId/comments', userVerification, createComment);
// router.get('/forum/:postId/comments', getComments);
// router.delete('/forum/comments/:id', userVerification, deleteComment);
router.post('/goals', userVerification, createGoal);
router.get('/goals', userVerification, getGoals);
router.patch('/goals/:id', userVerification);
router.patch('/goals/:id/status', userVerification, updateGoalStatus);
router.delete('/goals/:id', userVerification, deleteGoal);
router.post('/progress', userVerification, createProgress);
// Create a new study progress record
// Get all study progress records for the authenticated user
router.get('/progress', userVerification, getAllProgress);

router.patch('/progress/:id', userVerification, updateProgress);

router.delete('/progress/:id', userVerification, deleteProgress);

router.get('/progress', userVerification, getAllProgressForUser);

router.get('/progress', userVerification, getCumulativeWordsStudied);

module.exports = router;
