// const User = require("../models/UserModel");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = (req, res, next) => {
//   const token = req.cookies.token
//   if (!token) {
//     return res.json({ status: false })
//   }
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//       return res.json({ status: false })
//     } else {
//       const user = await User.findById(data.id)
//       if (user) return res.json({ status: true, user: user.username })
//       else return res.json({ status: false });
//     }
//   })
//   next();
// }


// const User = require("../models/UserModel");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ status: false, message: "No token provided." });
//   }
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ status: false, message: "Failed to authenticate token." });
//     } else {
//       try {
//         const user = await User.findById(decoded.id);
//         if (!user) {
//           return res.status(404).json({ status: false, message: "User not found." });
//         }
//         // Attach user to request object
//         req.user = user;
//         next();
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: false, message: "An error occurred while verifying the token." });
//       }
//     }
//   });
// };

const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}

