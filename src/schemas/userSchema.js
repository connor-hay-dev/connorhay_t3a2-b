const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
const User = mongoose.model('User', userSchema);

// // Reusable function to create a new user
// async function createUser(username, email, password) {
//   try {
//     // Create a new user instance
//     const newUser = new User({
//       username,
//       email,
//       password
//     });

//     // Save the user to the database
//     await newUser.save();

//     console.log('User created successfully:', newUser);
//     return newUser; // Return the created user object
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// }

// // createUser("Connor", "connor@connor.com", "connorsecure");
// // createUser("Bruno", "bruno@bruno.com", "brunosecure");
// // createUser("Harry", "harry@harry.com", "harrysecure");

// module.exports = User;