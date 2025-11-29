const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  console.log("Incoming /api/contact request body:", req.body);
  console.log("ENV EMAIL_USER:", process.env.EMAIL_USER);
  console.log("ENV EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "undefined");

  const { name, email, message, mobile } = req.body;

  // make mobile optional
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "name, email and message are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    // verify auth to produce a clear error quickly if auth fails
    await transporter.verify();
    console.log("Contact transporter verified");

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile || "N/A"}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mobile:</strong> ${mobile || "N/A"}</p><p><strong>Message:</strong><br/>${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Contact email sent:", info && info.response);
    return res.status(200).json({ success: true, message: "Message sent" });
  } catch (err) {
    console.error("Contact Email Error:", err);
    return res.status(500).json({ success: false, message: "Failed to send message", error: err && err.message ? err.message : err });
  }
};
