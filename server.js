const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));

const API_ENDPOINT = 'https://ping.arya.ai/api/v1/deepfake-detection/audio';
const API_TOKEN = 'c921ad9ff0613997f579b5b74bd3ad49'; // DO NOT DO THIS IN PRODUCTION!

app.post('/deepfake-check', async (req, res) => {
  try {
    const { doc_base64, req_id } = req.body;

    if (!doc_base64 || !req_id) {
      return res.status(400).json({ error: 'Missing doc_base64 or req_id' });
    }

    const options = {
      method: 'POST',
      url: API_ENDPOINT,
      headers: {
        token: API_TOKEN,
        'content-type': 'application/json',
      },
      data: {
        doc_base64: doc_base64,
        req_id: req_id,
      },
    };

    const response = await axios(options);

    res.json(response.data);
  } catch (error) {
    console.error('Error processing deepfake check:', error);

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;

// Vercel will handle the port
//app.listen(PORT, () => {
//  console.log(`Server listening on port ${PORT}`);
//});

module.exports = app;