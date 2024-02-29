const dotenv = require('dotenv');
dotenv.config();

// Establish the database connection
require('./database');

// Start the server
require('./server');