const Post = require('../models/ForumModel'); // Adjust the path as necessary
const User = require('../models/UserModel');
// // module.exports.createPost = async (req, res) => {
// //   try {
// //     const { title, content } = req.body;
// //     if (!title || !content) {
// //       return res.status(400).json({ message: 'Title and content are required' });
// //     }
// //     const post = new Post({
// //       author: req.user._id, // Assuming `requireAuth` middleware adds `user` to `req`
// //       title,
// //       content,
// //     });
// //     await post.save();

// //     res.status(201).json({ message: "Post created successfully", post });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'An error occurred' });
// //   }
// // };

// // module.exports.getPosts = async (req, res) => {
// //   try {
// //     const posts = await Post.find().populate('author', 'email').exec(); // Adjust based on your User model
// //     res.status(200).json(posts);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'An error occurred' });
// //   }
// // };

module.exports.createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
      }
  
      // Fetch the author's name from the User collection
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      // Now that we have the user, we can create the post with the author's name included
      const post = new Post({
        author: req.user._id, // Continue to set the author ObjectId
        authorName: req.user.username, // Include the author's name as a new field
        title,
        content
      });
      await post.save();
  
      // Optionally, if your Post model does not directly support an authorName field,
      // you could adjust the model to include this or return the data differently
  
      res.status(201).json({ message: "Post created successfully", post: { ...post._doc, authorName: user.name } });
      // Using post._doc to spread the existing post document, and explicitly adding authorName
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };


// module.exports.getPosts = async (req, res) => {
//     try {
//       const posts = await Post.find().lean().populate('author'); // Assuming the 'author' field is a reference to the User model
//       res.status(200).json(posts);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to fetch posts.' });
//     }
//   };

module.exports.getPosts = async (req, res) => {
    try {
      // Fetch all posts without populating any author information
      const posts = await Post.find().lean(); // .lean() for better performance
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch posts.' });
    }
};