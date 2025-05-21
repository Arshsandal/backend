const axios = require("axios");

const getLatLon = async (req, res) => {
  const { naptanId } = req.params;

  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${naptanId}`
    );

    const { lat, lon } = response.data;

    if (lat && lon) {
      res.status(200).json({ lat, lon });
    } else {
      res.status(404).json({ message: "Coordinates not found" });
    }
  } catch (error) {
    console.error("Error fetching from TFL:", error.message);
    res.status(500).json({ message: "Failed to fetch coordinates" });
  }
};

module.exports = getLatLon;
