require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./src/config/db');
const blogsRouter = require('./src/router/blogs.router');
const logger = require('./src/middleware/logger.middleware');

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(logger);

// Default Router
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Main Router
app.use('/api/v1/blog', blogsRouter);

// Error handling middleware for 404
app.use((req, res, next) => {
  res.status(404).send('Not found!');
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
