const express = require("express");

const router = express.Router();

const {
    addToWatchlist
} = require("../controllers/watchlistController");

router.post("/add", addToWatchlist);

module.exports = router;