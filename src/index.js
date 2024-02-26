// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // A simple route to check the server is working
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const dotenv = require('dotenv');
dotenv.config();

// Establish the database connection
require('./database');

// Start the server
require('./server');