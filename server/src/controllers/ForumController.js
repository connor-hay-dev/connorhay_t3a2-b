const Post = require('../models/ForumModel'); // Adjust the path as necessary


module.exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const post = new Post({
      author: req.user._id, // Assuming `requireAuth` middleware adds `user` to `req`
      title,
      content,
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'email').exec(); // Adjust based on your User model
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};