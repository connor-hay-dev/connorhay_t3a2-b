const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyProgressSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  topics: [String],
  topicsDetail: [{
    topicName: String,
    hoursSpent: Number
  }],
  wordsStudied: {
    type: Number,
    default: 0
  },
  hoursSpent: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

const Progress = mongoose.model('StudyProgress', studyProgressSchema);

module.exports = Progress;