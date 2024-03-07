const Progress = require('../models/StudyProgressModel'); // Adjust the path as necessary
const User = require('../models/UserModel'); // Ensure this path is correct

// Create new study progress record
module.exports.createProgress = async (req, res) => {
    try {
        const { subject, topics, topicsDetail, wordsStudied, hoursSpent, date } = req.body;

        // Verify the user exists in the database
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const newProgress = new Progress({
            author: req.user._id, // Link the progress record to the authenticated user
            subject,
            topics,
            topicsDetail,
            wordsStudied,
            hoursSpent,
            date: date || Date.now() // Use provided date or default to current date
        });

        await newProgress.save();

        res.status(201).json({ message: "Study progress added successfully", data: newProgress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add study progress.', error: error.message });
    }
};

module.exports.getAllProgress = async (req, res) => {
    try {
        // Fetches only the progress records associated with the authenticated user
        const progressList = await Progress.find({ userId: req.user._id });
        res.status(200).json(progressList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch study progress records', error: error.message });
    }
};

module.exports.updateProgress = async (req, res) => {
    try {
      // Ensure the progress record belongs to the authenticated user
      const updatedProgress = await Progress.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedProgress) {
        return res.status(404).json({ message: 'Study progress not found or you do not have permission to update this record.' });
      }
      res.status(200).json({ message: 'Study progress updated successfully', data: updatedProgress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update study progress', error: error.message });
    }
  };

  module.exports.deleteProgress = async (req, res) => {
    try {
      // Ensure the progress record belongs to the authenticated user before deletion
      const deletedProgress = await Progress.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
      if (!deletedProgress) {
        return res.status(404).json({ message: 'Study progress not found or you do not have permission to delete this record.' });
      }
      res.status(200).json({ message: 'Study progress deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete study progress', error: error.message });
    }
  };

  module.exports.getAllProgressForUser = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you're using authentication middleware that adds the user ID to req.user
        const progressData = await Progress.find({ author: userId });
        res.json(progressData);
    } catch (error) {
        res.status(500).send("Server error");
    }
};
  