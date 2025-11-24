const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
    role: {
        type: String,
        enum: ['developer', 'creator'],
        required: true
    },
    bio: {
        type: String,
        maxlength: 500,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    socialLinks: {
        twitter: { type: String, default: '' },
        discord: { type: String, default: '' },
        github: { type: String, default: '' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
