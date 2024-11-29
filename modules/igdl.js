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
const emoji = require('./emoji');

async function igdl(sock, m, M, text) {
  react(sock, m, M, emoji());

  let url = text;
  let hasPipe = url.includes("|");
  let tex;

  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }

  const url5 = 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587', // Replace with your actual API key
      'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url // Replace with the desired URL
    })
  };

  try {
    const response = await fetch(url5, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json(); // Parse response as JSON
    


    // Fetch and save the video
    const videoResponse = await axios.get(result.medias[0].url, { responseType: 'arraybuffer' });
    await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));

    // Send the video to the chat
    react(sock, m, M, emoji());
    await sendVideomp4(sock, m, M, videoFileName);

    // Clean up the temporary video file
    await fs.unlink(videoFileName);


  } catch (error) {
    console.error('Error during Instagram media download:', error.message || error);
    react(sock, m, M, emoji());
    sendM(sock, m, M, "*I Can't do This right now*");
  }
}

module.exports = igdl;
