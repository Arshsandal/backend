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
  from: `"Transport for London – Admin Team" <${process.env.GMAIL_ID}>`,
  to: email,
  subject: "Welcome Aboard – Your Account Has Been Created",
  html: `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #d01c1f; text-align: center;">🚍 Welcome to Transport for London!</h2>
        <p>Dear User,</p>
        <p>We’re excited to inform you that your account has been successfully created by the administrator. You're now part of a smarter way to travel through the capital.</p>
        <p><strong>Login Credentials:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>You can now log in to your dashboard, view routes, book tickets, and manage your journey preferences easily.</p>
        <p>If you have any questions or run into any issues, feel free to reach out to our support team.</p>
        <br>
        <p>Safe travels,</p>
        <p><strong>Transport for London – Admin Team</strong></p>
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
