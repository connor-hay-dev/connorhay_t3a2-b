const Post = require('../models/ForumModel');
const User = require('../models/UserModel');

module.exports.createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
      }
  
      
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      
      const post = new Post({
        author: req.user._id, 
        authorName: req.user.username, 
        title,
        content
      });
      await post.save();
  
      
  
      res.status(201).json({ message: "Post created successfully", post: { ...post._doc, authorName: user.name } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };




module.exports.getPosts = async (req, res) => {
    try {
      const posts = await Post.find().lean();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch posts.' });
    }
};

module.exports.deletePost = async (req, res) => {
  try {
      const postId = req.params.id; 

      
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ message: 'Post not found.' });
      }

      
      if (post.author.toString() !== req.user._id.toString()) {
          return res.status(401).json({ message: 'User not authorized to delete this post.' });
      }

      await Post.findByIdAndDelete(postId);

      res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete post.' });
  }
};
