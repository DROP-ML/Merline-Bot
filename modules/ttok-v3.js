const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { ttdl } = require('ruhend-scraper')
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const ttok_v4 = require('./ttok-v4');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function ttok_v3(sock, m, M, text) {

  var url = text
  let hasPipe = url.includes("|");
  var tex = "°° вєтα тєѕтιηg вσт °°";
  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }
  try {

    let data = await ttdl(url)


    if (data.code == 200) {
      react(sock, m,M, lang.react.down);

      const videoResponse = await axios.get(data.video_hd, { responseType: 'arraybuffer' });

      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m,M, lang.react.process);

      sendVideomp4(sock,m,M,videoFileName,tex)

      react(sock, m,M, lang.react.success);
      await fs.unlink(videoFileName);
    } else {
    console.log("ttok3 failed")
    ttok_v4(sock,m,M,text)
    }
  } catch (error) {
    console.log("ttok3 failed")
    ttok_v4(sock,m,M,text)
  }
}

module.exports = ttok_v3;
