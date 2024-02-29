const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  studyProgress: [{
    type: Schema.Types.ObjectId,
    ref: 'StudyProgress'
  }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
  username: 'johnDoe',
  email: 'johndoe@example.com',
  password: 'securePassword123',
});

async function createUser() {
  try {
    const savedUser = await newUser.save();
    console.log('User created successfully:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();

module.exports = User;

