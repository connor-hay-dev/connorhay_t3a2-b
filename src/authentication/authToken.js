require("dotenv").config();
const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorisation'];
//   const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
//   if (token == null) return res.sendStatus(401); // No token provided
  
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403); // Invalid token or expired
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};