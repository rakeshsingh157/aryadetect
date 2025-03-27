const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// API Token (Replace with your actual token)
const API_TOKEN = "gc23ffc5a2606c9ca22dboe415d6ff1f";  

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// Deepfake Audio Detection Route
app.post("/detect-audio", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No audio file uploaded" });
        }

        // Convert audio file to Base64
        const doc_base64 = req.file.buffer.toString("base64");

        // Send request to Arya AI API
        const response = await axios.post(
            "https://ping.arya.ai/api/v1/deepfake-detection/audio",
            { doc_base64, req_id: "12345" },
            {
                headers: {
                    token: API_TOKEN,
                    "Content-Type": "application/json",
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
