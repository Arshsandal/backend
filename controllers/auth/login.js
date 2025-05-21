// 



const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");
const { loginValidation } = require("../../services/validation_schema");
const { generateAccessToken } = require("../../services/generateToken");

const login = async (req, res) => {
  try {
    // Validate login input
    const loginResponse = await loginValidation.validateAsync(req.body);
    console.log("Login Request Data:", loginResponse);

    const { email, password } = loginResponse;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email Address. Please register.",
      });
    }

    // Check password
    const passwordMatching = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatching) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password. Please try again.",
      });
    }

    // Generate access token
    const accessSecret = process.env.ACCESSSECRETKEY;
    const payload = {
      username: existingUser.username,
      email: existingUser.email,
      userId: existingUser._id,
      role: existingUser.role,
    };

    const accessToken = generateAccessToken(payload, accessSecret);
    console.log("Generated Access Token:", accessToken);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Login successful 🎉",
      redirectTo: "/home",
      payload,
      token: accessToken,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = login;
