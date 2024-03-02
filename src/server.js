const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./authentication/authRoutes.js");

// Require the database configuration to establish the connection
require('./database');

require('./schemas/userSchema.js')

// Middleware to parse JSON bodies
app.use(express.json());


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// A simple route to check the server is working
app.get('/hello-world', (req, res) => {
    res.send('Hello World!');
  });

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoutes);

