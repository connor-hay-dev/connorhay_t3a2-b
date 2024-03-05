const { Signup, Login } = require("../controllers/authController");
const { createPost, getPosts } = require('../controllers/ForumController');
const { userVerification } = require("../middleware/authMiddleware");
// const pomodoroController = require('../controllers/PomodoroController');

const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/', userVerification);
router.post('/forum', userVerification, createPost);
router.get('/forum', getPosts);
// router.post('/pomodoro', pomodoroController.startSession);
// router.get('/pomodoro', pomodoroController.getSessions);


module.exports = router;
