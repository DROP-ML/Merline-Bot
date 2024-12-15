const axios = require('axios');
const lang = require('../handler/lang.json');
const { ttdl } = require('ruhend-scraper')

const fs = require('fs').promises; // Use fs.promises for async file operations
const { react, sendVideomp4 } = require('../handler/sendFunction');
const ttok_v2 = require('./ttok-v2');

async function ttok(sock, m,M, text,res) {

  try {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const videoFileName = `${randomNumber}.mp4`;

    let data = await ttdl(text)
    const response = await axios.get(data.video_hd, { responseType: 'arraybuffer' });

    await fs.writeFile(videoFileName, Buffer.from(response.data));
    react(sock, m,M, lang.react.upload);

    await sendVideomp4(sock,m,M,videoFileName,'')

    react(sock, m,M, lang.react.success);

    // Delete the file from the server
    await fs.unlink(videoFileName);
  } catch (error) {
    console.log("ttok1 failed")
    ttok_v2(sock,m,M,res)
  }
}

module.exports = ttok;
