const Goal = require('../models/GoalModel'); 
const User = require('../models/UserModel');

module.exports.createGoal = async (req, res) => {
    try {
        const { description, status, startDate, endDate, details } = req.body;
        if (!description || !endDate) { 
            return res.status(400).json({ message: 'Description and end date are required.' });
        }

        
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const newGoal = new Goal({
            author: req.user._id, 
            description,
            status,
            startDate,
            endDate,
            details,
        });

        await newGoal.save();

        res.status(201).json({ message: "Goal created successfully", goal: newGoal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create goal.' });
    }
};


module.exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ author: req.user._id }).lean().populate('author', 'username'); 
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch goals.' });
    }
};

module.exports.deleteGoal = async (req, res) => {
    try {
        const goalId = req.params.id; 

        
        const goal = await Goal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found.' });
        }

        
        if (goal.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this goal.' });
        }

        await Goal.findByIdAndDelete(goalId);

        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete goal.' });
    }
};

module.exports.updateGoalStatus = async (req, res) => {
    try {
        const goalId = req.params.id; 
        const { status } = req.body; 

        if (!['pending', 'in progress', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status.' });
        }

        const goal = await Goal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found.' });
        }

        if (goal.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to update this goal.' });
        }

        goal.status = status;
        await goal.save();

        res.status(200).json({ message: 'Goal status updated successfully', goal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update goal status.' });
    }
};
