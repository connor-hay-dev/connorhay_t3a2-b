const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/UserModel.js'); // Import the User model

// Require the database configuration to establish the connection
require('./database');

// Middleware to parse JSON bodies
app.use(express.json());


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});

// A simple route to check the server is working
app.get('/hello-world', (req, res) => {
    res.send('Hello World!');
  });

app.post('/login', async (req, res) => {
    try {
      // Find the user by username
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        // Check if the password is correct
        if (await bcrypt.compare(req.body.password, user.password)) {
          // User authenticated, create a JWT
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Use a secret from your environment variables
            { expiresIn: '24h' } // Token expires in 24 hours
          );
          
          // Send the token to the client
          res.json({ token });
        } else {
          res.status(400).send('Invalid password');
        }
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

