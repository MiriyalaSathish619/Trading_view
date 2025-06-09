const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Helper: Convert query to promise
const queryAsync = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Generate unique user ID
const generateUserIdForDemo = async () => {
    const query = "SELECT user_id FROM demo_accounts WHERE user_id LIKE 'DEMO_%' ORDER BY created_at DESC LIMIT 1";
    const result = await queryAsync(query, []);
    if (result.length === 0) return "DEMO_0001";
    const lastNumber = parseInt(result[0].user_id.split("_")[1], 10);
    return `DEMO_${String(lastNumber + 1).padStart(4, "0")}`;
};

// Generate unique referral ID
const generateUniqueReferralIdForDemo = async () => {
    let newReferralId, exists = true;
    while (exists) {
        newReferralId = "DEMO-REF-" + Math.floor(1000 + Math.random() * 9000);
        const checkQuery = "SELECT COUNT(*) AS count FROM demo_accounts WHERE generated_referral_id = ?";
        const result = await queryAsync(checkQuery, [newReferralId]);
        exists = result[0].count > 0;
    }
    return newReferralId;
};

// Signup route
router.post("/demo-signup", async (req, res) => {
    const { username, email, phone, password, trading_view_id, referral_id } = req.body;
    if (!username || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const checkQuery = "SELECT * FROM demo_accounts WHERE username = ? OR email = ? OR phone = ? OR trading_view_id = ?";
        const existing = await queryAsync(checkQuery, [username, email, phone, trading_view_id]);

        if (existing.length > 0) {
            return res.status(400).json({ error: "Username, Email, Phone, or Trading View ID already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user_id = await generateUserIdForDemo();
        const generated_referral_id = await generateUniqueReferralIdForDemo();

        const insertQuery = `
            INSERT INTO demo_accounts 
            (user_id, username, email, phone, password_hash, trading_view_id, referral_id, generated_referral_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await queryAsync(insertQuery, [user_id, username, email, phone, passwordHash, trading_view_id, referral_id, generated_referral_id]);

        res.status(201).json({ message: "Demo account created successfully", user_id, referral_id: generated_referral_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
