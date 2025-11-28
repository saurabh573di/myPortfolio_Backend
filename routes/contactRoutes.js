const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// POST /api/contact/send-message
router.post("/send-message", contactController.sendMessage);

module.exports = router;
