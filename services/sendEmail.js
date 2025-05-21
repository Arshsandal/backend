require("dotenv").config();  
const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,  
      pass: process.env.GMAIL_PASSWORD,  
    },
  });

const mailOptions = {
  from: `TfL Support Team - ${process.env.GMAIL_ID}`,
  to: email,
  subject: "Transport for London: OTP Verification for Password Reset",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f0f0;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color: #d0103a;">🔐 Reset Your TfL Account Password</h2>
        <p>Hello,</p>
        <p>We’ve received a request to reset the password for your <strong>Transport for London</strong> account.</p>
        <p>Please use the One-Time Password (OTP) below to proceed with resetting your password:</p>

        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; font-size: 34px; font-weight: bold; color: #d0103a; letter-spacing: 4px;">${otp}</span>
        </div>

        <p>This OTP is valid for <strong>10 minutes</strong>. If you did not request this change, please disregard this message or contact TfL support immediately.</p>

        <p>Thank you,<br>The Transport for London Team</p>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ccc;">
        <p style="text-align: center; font-size: 12px; color: #777;">
          &copy; 2025 Transport for London. All rights reserved.
        </p>
      </div>
    </div>
  `,
};

  

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtpEmail;
