const express = require("express");
const router = express.Router();
const { sendHireEmail } = require("../controllers/hireController");

// POST /api/hire
router.post("/", sendHireEmail);

module.exports = router;
