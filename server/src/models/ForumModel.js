const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./UserModel')

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  // comments: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Comment'
  // }],
  // reactions: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Reaction'
  // }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// const commentSchema = new Schema({
//   postId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Post',
//     required: true
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Comment = mongoose.model('Comment', commentSchema);
const Post = mongoose.model('Post', postSchema);

// async function createPostForUser(userId, title, content) {
//   try {
//     // First, verify that the user exists.
//     const userExists = await User.findById(userId);
//     if (!userExists) {
//       throw new Error('User does not exist');
//     }

//     // Create a new post.
//     const newPost = new Post({
//       userId,
//       title,
//       content
//     });

//     // Save the post to the database.
//     await newPost.save();

//     return newPost;
//   } catch (error) {
//     // Handle errors (e.g., user not found, validation errors)
//     console.error('Error creating post:', error.message);
//     throw error; // Rethrow or handle as needed
//   }
// }

// module.exports = createPostForUser;

module.exports = Post;
// module.exports = Comment;
