// const axios = require('axios');
// const lang = require('../handler/lang.json');
// const {cv} = require('./catch');
// const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
// const fs = require('fs').promises; // Use fs.promises for async file operations
// const randomNumber = Math.floor(Math.random() * 10) + 1;
// const videoFileName = `${randomNumber}.mp4`;
// const { ndown } = require("nayan-media-downloader");
// const emoji = require('./emoji');

// async function igdl(sock, m, M, text) {

//   var url = text
//   let hasPipe = url.includes("|");
//   // var tex = "°° вєтα тєѕтιηg вσт °°";
//   var tex ;
//   if (hasPipe) {
//     const gh = await cv(url);
//     url = gh.a;
//     tex = gh.b;
//   }
//   try {

//     let URL = await ndown(url);



//       react(sock, m,M, emoji());

//       const videoResponse = await axios.get(URL.data[0].url, { responseType: 'arraybuffer' });

//       await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
//       react(sock, m,M, emoji());

//       sendVideomp4(sock,m,M,videoFileName,tex)

//       react(sock, m,M, emoji());
//       await fs.unlink(videoFileName);
//   } catch (error) {
//     console.error('Error during Instagram video download:', error.message || error);
//     react(sock, m, M, emoji())
//     sendM(sock, m, M, "*I Can't do This right now*")
//   }
// }

// module.exports = igdl;



const axios = require('axios');
const { cv } = require('./catch');
const { react, sendVideomp4, sendM } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 100000) + 1;
const videoFileName = `ig_video_${randomNumber}.mp4`;
const { igdl } = require('ruhend-scraper')
const emoji = require('./emoji');
const igdl5 = require('./igdl');

async function igdl2(sock, m, M, text) {
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

    const dlurl = '';

    let res = await igdl(url);
    let data = await res.data;
    // console.log(res);
    for (let media of data) {
      new Promise(resolve => setTimeout(resolve, 2000));
      dlurl = media.url;
      /* media.url is or are link of videos or images that just one by one
       * or do something with your project
       */
    }



    // Fetch and save the video
    const videoResponse = await axios.get(dlurl, { responseType: 'arraybuffer' });
    await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));

    // Send the video to the chat
    react(sock, m, M, emoji());
    await sendVideomp4(sock, m, M, videoFileName, tex);

    // Clean up the temporary video file
    await fs.unlink(videoFileName);


  } catch (error) {
    await igdl5(sock, m, M, text);
  }
}

module.exports = igdl2;