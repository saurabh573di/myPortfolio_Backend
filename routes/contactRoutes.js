const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/contactController");

// POST /api/contact/send-message
router.post("/send-message", sendMessage);

module.exports = router;
