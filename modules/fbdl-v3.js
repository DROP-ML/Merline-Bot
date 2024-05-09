const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function fbdl_v3(sock, m, M, text) {

  var url = text
  let hasPipe = url.includes("|");
  var tex = "°° вєтα тєѕтιηg вσт °°";
  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }
  try {

    const response = await axios.get(`https://aemt.me/download/fbdown?url=${url}`);
    const data = response.data;
    console.log(data)
    if (data.code == 200) {
      react(sock, m,M, lang.react.down);
      var videoResponse;
        try {
            videoResponse = await axios.get(data.result.url.urls[0].hd, { responseType: 'arraybuffer' });
        } catch (error) {
            videoResponse = await axios.get(data.result.url.urls[0].sd, { responseType: 'arraybuffer' });
        }
      

      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m,M, lang.react.process);

      sendVideomp4(sock,m,M,videoFileName,tex)

      react(sock, m,M, lang.react.success);
      await fs.unlink(videoFileName);
    } else {
      react(sock, m, M, lang.react.error)
      await sendM(sock, m, M, "*FB Video Is Can't find ... Try .fb Command*")
    }
  } catch (error) {
    console.error('Error during FB video download:', error.message || error);
    react(sock, m, M, lang.react.error)
    sendM(sock, m, M, "*I Can't do it right now*")
  }
}

module.exports = fbdl_v3;
