const axios = require('axios');

// Set the URL of the Express server endpoint
const url = 'https://web-production-22c6a.up.railway.app/send-message';

// Prepare the data to send
const data = {
    phoneNumber: '12897174418', // Updated phone number
    text: 'Hello, this is a test message!' // The message text
};

// Send a POST request
axios.post(url, data)
    .then(response => {
        console.log("Response from server:", response.data);
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });
