const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5100;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
