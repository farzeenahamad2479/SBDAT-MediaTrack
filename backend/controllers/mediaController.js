const pool = require("../db");

// ============================
// Get All Media
// ============================

const getAllMedia = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM media ORDER BY title;"
        );

        res.json({
            success: true,
            media: result.rows
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch media."
        });

    }

};

// ============================
// Get Media By Type
// ============================

const getMediaByType = async (req, res) => {

    try {

        const { type } = req.params;

        const result = await pool.query(
            "SELECT * FROM media WHERE media_type = $1 ORDER BY title;",
            [type]
        );

        res.json({
            success: true,
            media: result.rows
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch media."
        });

    }

};

module.exports = {
    getAllMedia,
    getMediaByType
};