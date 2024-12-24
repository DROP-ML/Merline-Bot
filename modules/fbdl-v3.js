const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;
const { fbdl } = require('ruhend-scraper');

async function fbdl_v3(sock, m, M, text) {

  react(sock, m, M, emoji());

  let url = text;
  let hasPipe = url.includes("|");
  let tex;

  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }





  try {



    let res = await fbdl(url);
    let data = await res.data;
    // console.log(res);


      const videoResponse = await axios.get(data[0].url, { responseType: 'arraybuffer' });
      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));

      // Send the video to the chat
      react(sock, m, M, emoji());
      await sendVideomp4(sock, m, M, videoFileName, tex);

      // Clean up the temporary video file
      await fs.unlink(videoFileName);
      /* media.url is or are link of videos or images that just one by one
       * or do something with your project
       */
    



    // Fetch and save the video



  } catch (error) {
    // await igdl5(sock, m, M, text);
  }
}

module.exports = fbdl_v3;
