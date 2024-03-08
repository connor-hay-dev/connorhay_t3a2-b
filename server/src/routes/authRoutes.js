const { Signup, Login, Logout } = require("../controllers/authController");
const { createPost, getPosts } = require('../controllers/ForumController');
const { userVerification } = require("../middleware/authMiddleware");
const { createGoal } = require("../controllers/GoalController"); // import status setting
const { getGoals } = require("../controllers/GoalController");
const { createProgress, getAllProgress, getProgressById, getAllProgressForUser, updateProgress, deleteProgress, getCumulativeWordsStudied } = require("../controllers/ProgressTrackerController");
// const { createProgress } = require('../controllers/ProgressTrackerController')
// const pomodoroController = require('../controllers/PomodoroController');

const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.get('./logout', Logout)
router.post('/', userVerification);
router.post('/forum', userVerification, createPost);
router.get('/forum', getPosts);
router.post('/goals', userVerification, createGoal);
router.get('/goals', userVerification, getGoals);
router.patch('/goals/:id', userVerification, )
router.post('/progress', userVerification, createProgress);
// Create a new study progress record
// Get all study progress records for the authenticated user
router.get('/progress', userVerification, getAllProgress);

// Get a specific study progress record by ID
// router.get('/progress/:id', userVerification, getProgressById);

// Update a specific study progress record by ID
router.patch('/progress/:id', userVerification, updateProgress);

// Delete a specific study progress record by ID
router.delete('/progress/:id', userVerification, deleteProgress);

router.get('/progress', userVerification, getAllProgressForUser);

router.get('/progress', userVerification, getCumulativeWordsStudied);




// // Route to get all study progress records
// router.get('/progress', getAllProgress);

// // Route to get a single study progress record by ID
// router.get('/progress/:id', getProgressById);

// // Route to update a study progress record by ID
// router.patch('/progress/:id', updateProgress);

// // Route to delete a study progress record by ID
// router.delete('/progress/:id', deleteProgress);

// router.post('/pomodoro', pomodoroController.startSession);
// router.get('/pomodoro', pomodoroController.getSessions);


module.exports = router;
