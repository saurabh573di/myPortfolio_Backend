const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  const { name, email, message, mobile } = req.body;
  if (!name || !email || !message || !mobile) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    console.error("Contact Email Error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
