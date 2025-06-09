const axios = require("axios");

const searchBus = async (req, res) => {
  const { stationFrom } = req.query;

  if (!stationFrom) {
    return res.status(400).json({ message: "stationFrom query parameter is required" });
  }

  try {
    // Example: Replace with your actual logic or dynamic API
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(stationFrom)}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching bus data:", error.message);
    res.status(500).json({
      message: "Failed to fetch buses for the given station",
      error: error.message,
    });
  }
};

module.exports = searchBus;
