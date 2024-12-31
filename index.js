require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const blogs = require('./src/router/blogs.router');

const app = express();
const port = 5000;

// Default Router
app.get('/', (req, res) => {
  res.send('Hello Wrold');
});
// Main Router
app.use('/api/v1/', blogs);

// Error Router
app.get('*', (req, res) => {
  res.send('No found!');
});

const start = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error starting the server: ${error.message}`);
    process.exit(1);
  }
};

start();
