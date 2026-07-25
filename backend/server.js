const authRoutes = require("./routes/authRoutes");
const pool = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("🎬 Welcome to MediaTrack Backend!");
});

// Test Route
app.get("/api/test", async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT current_database(), current_user;"
        );

        res.json({
            success: true,
            message: "Connected to ShaktiDB!",
            data: result.rows[0]
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});