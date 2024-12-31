const express = require('express');
const router = express.Router();

const { getAllBlogs } = require('../controller/blogs.controller');

router.post('/', getAllBlogs);

module.exports = router;
