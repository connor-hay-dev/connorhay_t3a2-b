const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = process.env.ATLAS_URI;
const PORT = process.env.PORT;


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((error) => console.error('Could not connect to MongoDB Atlas:', error));

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

app.get('/hello-world', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

  
  

// mongoose.connection.once('open', () => {
//   console.log('MongoDB connection open');
// });

// Middleware to parse JSON bodies


// Start the server


// A simple route to check the server is working




