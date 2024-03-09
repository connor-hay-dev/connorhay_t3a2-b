const Post = require('../models/ForumModel'); // Adjust the path as necessary
// const Comment = require('../models/ForumModel')
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

module.exports.deletePost = async (req, res) => {
  try {
      const postId = req.params.id; // Assuming you're passing the post ID as a URL parameter

      // Find the post to ensure it exists
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ message: 'Post not found.' });
      }

      // Assuming `requireAuth` middleware adds `user` to `req`
      // Check if the current user is the author of the post or has other permissions to delete it
      if (post.author.toString() !== req.user._id.toString()) {
          return res.status(401).json({ message: 'User not authorized to delete this post.' });
      }

      // If the check passes, delete the post
      await Post.findByIdAndDelete(postId);

      res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete post.' });
  }
};





// Create a comment
// module.exports.createComment = async (req, res) => {
//   try {
//     const { postId, content } = req.body;
//     if (!postId || !content) {
//       return res.status(400).json({ message: 'Post ID and content are required.' });
//     }

//     const comment = new Comment({
//       postId,
//       userId: req.user._id,
//       content,
//     });
//     await comment.save();

//     // Optionally, update the Post document to include this comment's ID
//     await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

//     res.status(201).json({ message: "Comment added successfully", comment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// };

// module.exports.createComment = async (req, res) => {
//   try {
//     // Change from req.body to req.params
//     const { postId } = req.params;
//     const { content } = req.body;
//     if (!content) {
//       return res.status(400).json({ message: 'Content is required.' });
//     }

//     const comment = new Comment({
//       postId,
//       userId: req.user._id,
//       content,
//     });
//     await comment.save();

//     // Optionally, update the Post document to include this comment's ID
//     await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

//     res.status(201).json({ message: "Comment added successfully", comment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// };


// Fetch comments for a post
// module.exports.getComments = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const comments = await Comment.find({ postId }).populate('userId', 'username'); // Adjust 'username' based on your User model
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch comments.' });
//   }
// };

// Delete a comment
// module.exports.deleteComment = async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const comment = await Comment.findById(commentId);

//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found.' });
//     }

//     // Verify the user attempting to delete the comment is the one who posted it
//     if (comment.userId.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: 'User not authorized.' });
//     }

//     await Comment.findByIdAndRemove(commentId);
//     res.status(200).json({ message: 'Comment deleted successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete comment.' });
//   }
// };

// module.exports.deleteComment = async (req, res) => {
//   try {
//       const commentId = req.params.id; // Adjust to match the URL parameter used for comments

//       // Find the comment to ensure it exists and to check if the current user is the author
//       const comment = await Comment.findById(commentId);
//       if (!comment) {
//           return res.status(404).json({ message: 'Comment not found.' });
//       }

//       // Assuming `requireAuth` middleware adds `user` to `req`
//       // Check if the current user is the author of the comment
//       if (comment.userId.toString() !== req.user._id.toString()) {
//           return res.status(401).json({ message: 'User not authorized to delete this comment.' });
//       }

//       // If the check passes, delete the comment
//       await Comment.findByIdAndDelete(commentId);

//       res.status(200).json({ message: 'Comment deleted successfully' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to delete comment.' });
//   }
// };

// module.exports.deleteComment = async (req, res) => {
//   try {
//     // Extract 'id' from req.params, assuming the route is defined as /comments/:id
//     const { id: commentId } = req.params;

//     // Find the comment to ensure it exists and to check if the current user is the author
//     const comment = await Comment.findById(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found.' });
//     }

//     // Assuming `requireAuth` middleware adds `user` to `req`
//     // Check if the current user is the author of the comment
//     if (comment.userId.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: 'User not authorized to delete this comment.' });
//     }

//     // If the check passes, delete the comment
//     await Comment.findByIdAndDelete(commentId);

//     res.status(200).json({ message: 'Comment deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete comment.' });
//   }
// };