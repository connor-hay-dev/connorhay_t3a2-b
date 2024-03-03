require('dotenv').config({ path: '../.env' });
const app = require('./server');
const connectDatabase = require('./database');

const PORT = process.env.PORT || 3000;

// Connect to Database
connectDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
