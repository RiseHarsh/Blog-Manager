const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    author: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },

    views: {
      type: Number,
      default: 0
    },

    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
