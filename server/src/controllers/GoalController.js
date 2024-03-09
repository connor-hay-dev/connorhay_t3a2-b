const Goal = require('../models/GoalModel'); // Adjust the path as necessary
const User = require('../models/UserModel');
// Create a new Goal
module.exports.createGoal = async (req, res) => {
    try {
        const { description, status, startDate, endDate, details } = req.body;
        if (!description || !endDate) { // startDate is automatically set to now if not provided
            return res.status(400).json({ message: 'Description and end date are required.' });
        }

        // Assuming `requireAuth` middleware adds `user` to `req`
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const newGoal = new Goal({
            author: req.user._id, // Adjusted to lowercase 'a' for convention
            description,
            status,
            startDate,
            endDate,
            details,
        });

        await newGoal.save();

        // If you need to include user details in the response, adjust accordingly
        res.status(201).json({ message: "Goal created successfully", goal: newGoal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create goal.' });
    }
};

// Fetch all Goals
module.exports.getGoals = async (req, res) => {
    try {
        // Adjust 'Author' to 'author' to match schema if needed
        // If 'Author' in your schema is intentional, ensure consistency across your application
        const goals = await Goal.find().lean().populate('author', 'username'); // Assuming 'username' is a field in your User model
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch goals.' });
    }
};


// build status setting 

module.exports.deleteGoal = async (req, res) => {
    try {
        const goalId = req.params.id; // Assuming you're passing the goal ID as a URL parameter

        // Find the goal to ensure it exists and to check if the current user is the author
        const goal = await Goal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found.' });
        }

        // Assuming `requireAuth` middleware adds `user` to `req`
        // Check if the current user is the author of the goal or has other permissions to delete it
        if (goal.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this goal.' });
        }

        // If the check passes, delete the goal
        await Goal.findByIdAndDelete(goalId);

        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete goal.' });
    }
};