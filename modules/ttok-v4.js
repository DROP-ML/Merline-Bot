const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function ttok_v4(sock, m, M, text) {

  var url = text
  let hasPipe = url.includes("|");
  var tex = "°° вєтα тєѕтιηg вσт °°";
  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }
  try {

    const response = await axios.get(`https://aemt.me/download/tiktokdl?url=${url}`);
    const data = response.data;

    if (data.code == 200) {
      react(sock, m,M, lang.react.down);

      const videoResponse = await axios.get(data.result.video, { responseType: 'arraybuffer' });

      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m,M, lang.react.process);

      sendVideomp4(sock,m,M,videoFileName,tex)

      react(sock, m,M, lang.react.success);
      await fs.unlink(videoFileName);
    } else {
      react(sock, m, M, lang.react.error)
      await sendM(sock, m, M, "*Tiktok Video Is Can't find ... Try .tk Command*")
    }
  } catch (error) {
    console.error('Error during Tiktok video download:', error.message || error);
    react(sock, m, M, lang.react.error)
    sendM(sock, m, M, "*I Can't do it right now*")
  }
}

module.exports = ttok_v4;
