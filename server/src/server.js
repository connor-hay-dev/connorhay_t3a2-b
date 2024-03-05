const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
// const connectDatabase = require('./database');

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

module.exports = app;



