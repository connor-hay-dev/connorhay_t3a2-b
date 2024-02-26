// const mongoose = require('mongoose');


// async function databaseConnector(databaseURL){
//     await mongoose.connect(databaseURL);
// }

// async function databaseDisconnector(){
//     await mongoose.connection.close();
// }

// module.exports = {
//     databaseConnector,
//     databaseDisconnector
// }

const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


// Replace the following with your MongoDB Atlas connection string
const mongoURI = process.env.ATLAS_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((error) => console.error('Could not connect to MongoDB Atlas:', error));

const PORT = process.env.PORT;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection open');
});