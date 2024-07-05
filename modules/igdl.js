const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;
const { ndown } = require("nayan-media-downloader")

async function igdl(sock, m, M, text) {

  var url = text
  let hasPipe = url.includes("|");
  var tex = "°° вєтα тєѕтιηg вσт °°";
  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }
  try {

    let URL = await ndown(url);


    
      react(sock, m,M, lang.react.down);

      const videoResponse = await axios.get(URL.data[0].url, { responseType: 'arraybuffer' });

      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m,M, lang.react.process);

      sendVideomp4(sock,m,M,videoFileName,tex)

      react(sock, m,M, lang.react.success);
      await fs.unlink(videoFileName);
  } catch (error) {
    console.error('Error during Instagram video download:', error.message || error);
    react(sock, m, M, lang.react.error)
    sendM(sock, m, M, "*I Can't do This right now*")
  }
}

module.exports = igdl;
