const nodemailer = require("nodemailer");

const sendHireEmail = async (req, res) => {
  console.log("Incoming /api/hire request body:", req.body);
  console.log("ENV EMAIL_USER:", process.env.EMAIL_USER);
  console.log("ENV EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'undefined');

  const { name, email, projectType, description } = req.body;
  if (!name || !email || !projectType || !description) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // verify before sending to get clear error now
    await transporter.verify();
    console.log("Transporter verified inside controller");

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Project Inquiry: ${projectType}`,
      text: `New Hire Request:\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nDescription: ${description}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Hire email sent:", info && info.response);
    return res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Hire Email Error:", err);
    return res.status(500).json({ success: false, message: "Failed to send hire email", error: err.message });
  }
};

module.exports = { sendHireEmail };