const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();


// 🔵 **Helper Function: Convert Callbacks to Promises**
const queryAsync = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Function to generate user_id (Auto-increment like USER_0001)
const generateUserId = async () => {
    try {
        const query = "SELECT user_id FROM users WHERE user_id LIKE 'USER_%' ORDER BY created_at DESC LIMIT 1";
        const result = await queryAsync(query, []);

        if (result.length === 0) return "USER_0001";

        const lastUserId = result[0].user_id;
        const lastNumber = parseInt(lastUserId.split("_")[1], 10);
        return `USER_${String(lastNumber + 1).padStart(4, "0")}`;
    } catch (error) {
        throw error;
    }
};

// Function to generate a unique referral ID
const generateUniqueReferralId = async () => {
    let newReferralId;
    let exists = true;

    while (exists) {
        newReferralId = "REF-" + Math.floor(1000 + Math.random() * 9000);
        const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE generated_referral_id = ?";
        const result = await queryAsync(checkQuery, [newReferralId]);

        exists = result[0].count > 0;
    }

    return newReferralId;
};

// 🟢 **Signup Route**
router.post("/signup", async (req, res) => {
    const { username, email, phone, password, trading_view_id, referral_id } = req.body;

    if (!username || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if username, email, phone, or trading_view_id already exist
        const checkQuery = "SELECT * FROM users WHERE username = ? OR email = ? OR phone = ? OR trading_view_id = ?";
        const existingUsers = await queryAsync(checkQuery, [username, email, phone, trading_view_id]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: "Username, Email, Phone, or Trading View ID already exists" });
        }

        // Generate Hashed Password
        const passwordHash = await bcrypt.hash(password, 10);

        // Generate User ID
        const user_id = await generateUserId();

        // Generate Unique Referral ID
        const generated_referral_id = await generateUniqueReferralId();

        // Insert into DB
        const insertQuery =
            "INSERT INTO users (user_id, username, email, phone, password_hash, trading_view_id, referral_id, generated_referral_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await queryAsync(insertQuery, [user_id, username, email, phone, passwordHash, trading_view_id, referral_id, generated_referral_id]);

        res.status(201).json({ message: "User registered successfully", user_id, referral_id: generated_referral_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// 🟠 **Sign In Route**
router.post("/signin", async (req, res) => {
    const { identifier, password } = req.body; // User can log in with email, phone, or trading_view_id

    if (!identifier || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const query = "SELECT * FROM users WHERE email = ? OR phone = ? OR trading_view_id = ?";
        const users = await queryAsync(query, [identifier, identifier, identifier]);

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = users[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, user_id: user.user_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
const resetTokens = {}; // Store tokens temporarily

router.post("/forgot-password", async (req, res) => {
    const { identifier } = req.body;
    console.log("Received identifier:", identifier); // ✅ Log received data

    if (!identifier) {
        console.log("❌ Identifier missing!");
        return res.status(400).json({ error: "Identifier is required" });
    }

    try {
        const query = "SELECT * FROM users WHERE email = ? OR phone = ? OR trading_view_id = ?";
        console.log("Executing query:", query, [identifier, identifier, identifier]); // ✅ Log query parameters

        const users = await queryAsync(query, [identifier, identifier, identifier]);
        console.log("Query Result:", users); // ✅ Log query response

        if (!users || users.length === 0) {
            console.log("❌ User not found!");
            return res.status(404).json({ error: "User not found" });
        }

        // Generate Reset Token
        const resetToken = uuidv4();
        resetTokens[users[0].user_id] = resetToken; // Store in memory
        console.log("Generated Reset Token:", resetToken); // ✅ Log reset token

        // Simulate sending reset link
        console.log(`Reset Link: http://localhost:5501/reset-password.html?token=${resetToken}`);

        res.status(200).json({ message: "Reset link sent to registered email/phone", resetToken });

    } catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/reset-password", async (req, res) => {
    const { identifier, new_password } = req.body; // Identifier can be email, phone, or TradingView ID

    if (!identifier || !new_password) {
        return res.status(400).json({ error: "Identifier and new password are required" });
    }

    try {
        // Check if user exists
        const query = "SELECT * FROM users WHERE email = ? OR phone = ? OR trading_view_id = ?";
        const users = await queryAsync(query, [identifier, identifier, identifier]);

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // Update password in DB and get the affected rows
        const result = await queryAsync(
            "UPDATE users SET password_hash = ? WHERE email = ? OR phone = ? OR trading_view_id = ?", 
            [hashedPassword, identifier, identifier, identifier]
        );

        // Check if the update was successful
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Password reset successfully" });
        } else {
            return res.status(400).json({ error: "Password reset failed. No changes made." });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
