const pool = require("../db");

const addToWatchlist = async (req, res) => {

    try {

        const { user_id, media_id } = req.body;

        const query = `
            INSERT INTO watchlist (user_id, media_id)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await pool.query(query, [user_id, media_id]);

        res.status(201).json({
            success: true,
            message: "Added to watchlist!",
            watchlist: result.rows[0]
        });

    } catch (err) {

        if (err.code === "23505") {

            return res.status(409).json({
                success: false,
                message: "Already in watchlist."
            });

        }

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }

};

module.exports = {
    addToWatchlist
};