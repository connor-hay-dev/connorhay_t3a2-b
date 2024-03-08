const Goal = require('../models/GoalModel'); // Adjust the path as necessary
const User = require('../models/UserModel');

// Create a new Goal
// module.exports.createGoal = async (req, res) => {
//     try {
//         const { description, status, startDate, endDate, details } = req.body;
//         if (!description || !endDate) { // startDate is automatically set to now if not provided
//             return res.status(400).json({ message: 'Description and end date are required.' });
//         }

//         // Assuming `requireAuth` middleware adds `user` to `req`
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const newGoal = new Goal({
//             author: req.user._id,
//             description,
//             status,
//             startDate,
//             endDate,
//             details,
//         });

//         await newGoal.save();

//         // If you need to include user details in the response, adjust accordingly
//         res.status(201).json({ message: "Goal created successfully", goal: newGoal });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to create goal.' });
//     }
// };

// // Fetch all Goals
// module.exports.getGoals = async (req, res) => {
//     try {
//         // If you want to include author details, ensure to adjust .populate() accordingly
//         const goals = await Goal.find().lean().populate('Author', 'username'); // Adjust 'username' as necessary
//         res.status(200).json(goals);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to fetch goals.' });
//     }
// };


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