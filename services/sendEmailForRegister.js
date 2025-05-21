require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmailForAddUser = async (email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

const mailOptions = {
  from: `"Transport for London – Support Team" <${process.env.GMAIL_ID}>`,
  to: email,
  subject: "Welcome to Transport for London – Registration Successful",
  html: `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #d01c1f; text-align: center;">🎉 Welcome to Transport for London!</h2>
        <p>Hi there,</p>
        <p>Thank you for registering with <strong>Transport for London</strong>. Your account has been successfully created and you're now part of a seamless and smarter travel experience across the city.</p>
        
        <p><strong>Your Login Details:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>

        <p>Use these credentials to log in to your account and start planning your journeys, tracking buses, and accessing exclusive features on our platform.</p>
        
        <p>If you ever forget your password, you can reset it easily through our website.</p>
        <br>
        <p>Welcome aboard,</p>
        <p><strong>The Transport for London Team</strong></p>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
        <p style="text-align: center; font-size: 12px; color: #999;">&copy; 2025 Transport for London. All rights reserved.</p>
      </div>
    </div>
  `,
};



  try {
    await transporter.sendMail(mailOptions);
    console.log("Add User email sent successfully");
  } catch (error) {
    console.error("Error sending Add User email:", error); // Corrected log
    throw new Error("Failed to send Add User email");
  }
};

module.exports = sendEmailForAddUser;
