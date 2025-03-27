const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Deepfake API Token (Apna actual token daal)
const API_TOKEN = "9121fb99fb6b6890f27fb0b41ad7a84a"; 

// Multer Storage for Audio Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// API Route for Audio Upload and Deepfake Detection
app.post("/detect-audio", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Convert Audio to Base64
        const audioPath = req.file.path;
        const audioBase64 = fs.readFileSync(audioPath, { encoding: "base64" });

        // API Request to Arya AI
        const response = await axios.post(
            "https://ping.arya.ai/api/v1/deepfake-detection/audio",
            {
                doc_base64: audioBase64,
                req_id: Date.now().toString(), // Random Unique ID
            },
            {
                headers: {
                    token: API_TOKEN,
                    "content-type": "application/json",
                },
            }
        );

        // Delete File After Upload
        fs.unlinkSync(audioPath);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error detecting deepfake", details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
