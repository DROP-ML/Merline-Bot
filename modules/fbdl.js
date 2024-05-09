const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fbdl_v2 = require('./fbdl-v2');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 100000) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function fbdl(sock, m, M, text) {
  react(sock, m,M, lang.react.process);

  var url2 = text
  let hasPipe = url2.includes("|");
  var tex = "°° вєтα тєѕтιηg вσт °°";
  if (hasPipe) {
    const gh = await cv(url2);
    url2 = gh.a;
    tex = gh.b;
  }
  const options = {
    method: 'GET',
    url: 'https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php',
    params: {
      url: url2
    },
    headers: {
      'X-RapidAPI-Key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587',
      'X-RapidAPI-Host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    const videoResponse = await axios.get(response.data.media[0].hd_url, { responseType: 'arraybuffer' });
    await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
    react(sock, m,M, lang.react.upload);
    await sendVideomp4(sock,m,M,videoFileName,tex)

    react(sock, m,M, lang.react.success);
    await fs.unlink(videoFileName);
  } catch (error) {
    fbdl_v2(sock,m,M,text)
  }
}

module.exports = fbdl;
