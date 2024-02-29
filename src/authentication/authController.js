const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js'); // Assuming your User model is in User.js

const registerUser = async (req, res) => {
  // Registration logic...
};

const loginUser = async (req, res) => {
  // Login logic...
};

module.exports = { registerUser, loginUser };