const axios = require('axios');
const lang = require('../handler/lang.json');
const { cv } = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function ttok_v4(sock, m, M, text) {
  let url = text;
  let tex = "°° вєтα тєѕтιηg вσт °°";
  
  // If the URL contains a pipe, process accordingly
  let hasPipe = url.includes("|");
  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }

  try {
    // Set up options for the API request
    const url5 = 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587', // Replace with your actual API key
      'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url // Replace with the desired URL
    })
  };

    // Make the API call to get the video download URL
    const response = await fetch(url5, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json(); // Parse response as JSON
    
      react(sock, m, M, lang.react.down);

      // Download the video using the provided URL
      const videoResponse = await axios.get(result.medias[0].url, { responseType: 'arraybuffer' });

      // Save the video file
      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m, M, lang.react.process);

      // Send the video to the user
      await sendVideomp4(sock, m, M, videoFileName, tex);

      react(sock, m, M, lang.react.success);
      // Clean up the file after sending
      await fs.unlink(videoFileName);
  } catch (error) {
    console.error('Error during Tiktok video download:', error.message || error);
    react(sock, m, M, lang.react.error);
    sendM(sock, m, M, "*I Can’t do it right now*");
  }
}

module.exports = ttok_v4;
