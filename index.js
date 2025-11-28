const express = require("express");
const cors = require("cors");
require("dotenv").config();

const hireRoutes = require("./routes/hireRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hire", hireRoutes);
app.use("/api/contact", contactRoutes);

console.log('STARTUP: EMAIL_USER=', process.env.EMAIL_USER);
console.log('STARTUP: EMAIL_PASS length=', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'undefined');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
