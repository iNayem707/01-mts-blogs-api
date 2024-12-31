const express = require('express');
const router = express.Router();

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blogs.controller');

router.route('/').get(getAllBlogs).post(createBlog);
router.route('/:id').patch(updateBlog).delete(deleteBlog);

module.exports = router;
