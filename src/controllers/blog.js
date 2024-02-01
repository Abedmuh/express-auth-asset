const mongoose = require('mongoose')
const Blog = require('../models/blog')

const addBlog = async (req, res) => {
  try {
    const { title, content, id } = req.body;

    const blog = new Blog({
      title,
      content,
      owner: id
    });
    await blog.save();

    res.status(201).json({
      message: 'Data blog berhasil ditambahkan',
      title: blog.title,
      owner: blog.owner
    });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAllBlogs = async (req, res) => {
  try {

    const allBlogs = await Blog.find()
    res.status(201).json({ allBlogs })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: 'ID blog tidak valid' });
    }

    const blog = await Blog.findById(blogId);

    if (blog) {
      res.status(200).json({
        message: "Data blog berhasil ditemukan",
        blog
      });
    } else {
      res.status(404).json({ error: 'Blog tidak ditemukan' });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const owner = req.body.id;
    const { title, content } = req.body

    // verify blog
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: 'ID blog tidak valid' });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog tidak ditemukan' });
    }
    if (blog.owner != owner) {
      return res.status(403).json({ error: 'Blog ini bukan milikmu' });
    }

    // update blog status
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      title,
      content,
      { new: true, runValidators: true }
    );

    if (updatedBlog) {
      res.status(200).json({ message: 'Blog berhasil diupdate', updatedBlog });
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const owner = req.body.id;

    //verify blog
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: 'ID blog tidak valid' });
    }
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog tidak ditemukan' });
    }
    if (blog.owner != owner) {
      return res.status(403).json({ error: 'Blog ini bukan milikmu' });
    }

    //delete blog
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (deletedBlog) {
      res.status(200).json({
        message: 'Blog berhasil dihapus',
        deletedBlog
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
}