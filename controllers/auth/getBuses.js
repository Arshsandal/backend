const axios = require("axios");

const getBuses = async (req, res) => {
  try {
    const token = req.headers.authorization; // Should be in format: Bearer <token>

    const response = await axios.get(
      "https://api.tfl.gov.uk/Line/24,73,159/Arrivals?sort=timeToStation",
      {
        headers: {
          Authorization: token, // forward token to TFL if needed
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bus arrivals",
      error: error.message,
    });
  }
};

module.exports = getBuses;
