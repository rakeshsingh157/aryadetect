var request = require('request');
	var options = {
	  'method': 'POST',
	  'url': 'https://ping.arya.ai/api/v1/deepfake-detection/audio',
	  'headers': {
	  'token': '9121fb99fb6b6890f27fb0b41ad7a84a',
	  'content-type':'application/json'
	},
	body: '{"doc_base64": "< base64 string of audio >","req_id": < req id string > }'
	};
	request(options, function (error, response) {
	if (error) throw new Error(error);
	  console.log(response.body);
	});