const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// API Token (Directly code me rakha hai)
const API_TOKEN = "gc23ffc5a2606c9ca22dboe415d6ff1f"; 

app.use(cors());
app.use(bodyParser.json());

// Deepfake Audio Detection API Route
app.post("/detect-audio", async (req, res) => {
    try {
        const { doc_base64, req_id } = req.body;

        if (!doc_base64 || !req_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // API Call to Arya AI
        const response = await axios.post(
            "https://ping.arya.ai/api/v1/deepfake-detection/audio",
            { doc_base64, req_id },
            {
                headers: {
                    token: API_TOKEN,
                    "content-type": "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error detecting deepfake", details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
