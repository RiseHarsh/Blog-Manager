const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    author: {
      type: String,
      required: true
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',        // references the User model
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

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
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
