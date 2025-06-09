const db = require('../config/db');

// Fetch all users
const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// Fetch user by ID
const getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// Create user
const createUser = async (user) => {
    const { user_id, username, email, phone, password_hash, trading_view_id, referral_id, generated_referral_id } = user;
    const result = await db.query(
        'INSERT INTO users (user_id, username, email, phone, password_hash, trading_view_id, referral_id, generated_referral_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [user_id, username, email, phone, password_hash, trading_view_id, referral_id, generated_referral_id]
    );
    return result;
};

module.exports = { getAllUsers, getUserById, createUser };
