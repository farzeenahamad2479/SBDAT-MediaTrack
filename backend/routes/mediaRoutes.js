const express = require("express");
const router = express.Router();

const {
    getAllMedia,
    getMediaByType
} = require("../controllers/mediaController");

router.get("/", getAllMedia);

router.get("/type/:type", getMediaByType);

module.exports = router;