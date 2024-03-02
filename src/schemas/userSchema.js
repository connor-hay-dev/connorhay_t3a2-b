const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

// Reusable function to create a new user
async function createUser(username, email, password) {
  try {
    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();

    console.log('User created successfully:', newUser);
    return newUser; // Return the created user object
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// createUser("Connor", "connor@connor.com", "connorsecure");
// createUser("Bruno", "bruno@bruno.com", "brunosecure");
// createUser("Harry", "harry@harry.com", "harrysecure");

module.exports = User;