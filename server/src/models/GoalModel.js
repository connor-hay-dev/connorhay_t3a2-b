const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  details: {
    type: String,
    trim: true
  }
}, {
  timestamps: true, 
});

const Goal = mongoose.model('Goals', goalSchema);

module.exports = Goal;