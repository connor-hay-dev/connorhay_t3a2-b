const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./authentication/authRoutes.js");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});

// A simple route to check the server is working
app.get('/hello-world', (req, res) => {
    res.send('Hello World!');
  });



