const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
// const connectDatabase = require('./database');

const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN_URL], // [, netlify address]
    credentials: true,
  })
);



app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

module.exports = app;



