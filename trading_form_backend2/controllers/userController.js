const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const result = await User.createUser(newUser);
        res.status(201).json({ message: 'User created', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};
