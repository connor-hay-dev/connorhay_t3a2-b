const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.ATLAS_URI;

const connectDatabase = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch((error) => console.error('Could not connect to MongoDB Atlas:', error));
};

module.exports = connectDatabase;