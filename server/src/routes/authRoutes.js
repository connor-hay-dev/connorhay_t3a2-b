const { Signup, Login } = require("../controllers/authController");
const { createPost, getPosts } = require('../controllers/ForumController');
const { userVerification } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/', userVerification);
router.post('/posts', userVerification, createPost);
router.get('/posts', getPosts);


module.exports = router;
