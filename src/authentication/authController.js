const bcrypt = require('bcrypt');
const { createSecretToken } = require("./authToken.js");
const User = require('../schemas/userSchema.js'); // Assuming your User model is in User.js

// const registerUser = async (req, res) => {
//   // Registration logic...
// };

// const loginUser = async (req, res) => {
//   // Login logic...
// };

// module.exports = { registerUser, loginUser };

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, timestamps } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, timestamps });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};