//      Checked 05/25/2024


const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function single(sock, m, M) {

  try {

    const response = await fetch('https://aemt.me/asupandouyin');
    const data = await response.json();

      react(sock, m,M, lang.react.down);

      const videoResponse = await axios.get(data.url, { responseType: 'arraybuffer' });

      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m,M, lang.react.process);

      sendVideomp4(sock,m,M,videoFileName)

      react(sock, m,M, lang.react.success);
      await fs.unlink(videoFileName);
  } catch (error) {
    console.error('Error during Instagram video download:', error.message || error);
    react(sock, m, M, lang.react.error)
    sendM(sock, m, M, "*You May Absolutely Need To Stay As A Single Person*")
  }
}

module.exports = single;
