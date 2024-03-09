const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
      if (err) {
          return res.status(400).json({ message: "Invalid token." });
      } else {
          const user = await User.findById(decoded.id);
          if (!user) {
              return res.status(404).json({ message: "User not found." });
          }
          req.user = user; 
          next(); 
      }
  });
};
