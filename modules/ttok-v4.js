const axios = require('axios');
const lang = require('../handler/lang.json');
const { cv } = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function ttok_v4(sock, m, M, text) {
  var url = text;
  let hasPipe = url.includes("|");
  var tex = "°° вєтα тєѕтιηg вσт °°";

  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }

  try {
    // Fetch the video download link using the new API
    const apiUrl = `https://tiktok-video-downloader-api.p.rapidapi.com/media?videoUrl=${encodeURIComponent(url)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587',
        'x-rapidapi-host': 'tiktok-video-downloader-api.p.rapidapi.com'
      }
    };

    const response = await axios.get(apiUrl, options);
    const data = response.downloadUrl;
    console.log(data); // Log the full response JSON

      react(sock, m, M, lang.react.down);

      const videoResponse = await axios.get(data, { responseType: 'arraybuffer' });
      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m, M, lang.react.process);

      sendVideomp4(sock, m, M, videoFileName, tex);

      react(sock, m, M, lang.react.success);
      await fs.unlink(videoFileName);

  } catch (error) {
    console.error('Error during TikTok video download:', error.message || error);
    react(sock, m, M, lang.react.error);
    sendM(sock, m, M, "*I Can't do it right now*");
  }
}

module.exports = ttok_v4;
