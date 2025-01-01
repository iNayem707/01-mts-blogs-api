const Blog = require('../model/blogs.model'); // Assuming you have a Blog model

// GET :: api/v1/blog
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// GET :: api/v1/blog
const getSingleBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findOne();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// POST :: api/v1/blog
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validate the blog data
    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: 'Title, content, and author are required' });
    }

    // Create a new blog post
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();

    // Send a success response
    res
      .status(201)
      .json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH :: api/v1/blog/:id
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    // Validate the blog data
    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: 'Title, content, and author are required' });
    }

    // Find the blog by id and update it
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true, runValidators: true }
    );

    // Check if the blog exists
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Send a success response
    res
      .status(200)
      .json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE :: api/v1/blog/:id
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);

    // Send a success response
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
