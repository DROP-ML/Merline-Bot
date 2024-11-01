const { XVDL } = require('xvdl'); // Import the xvdl library
const { cv } = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 10) + 1;
const videoFileName = `${randomNumber}.mp4`;
const emoji = require('./emoji');

async function xvdl(sock, m, M, text) {
  var url = text;
  let hasPipe = url.includes("|");
  var tex;
  
  if (hasPipe) {
    const gh = await cv(url);
    url = gh.a;
    tex = gh.b;
  }
  
  try {
    // Use xvdl to get video information and download the video
    const videoInfo = await XVDL.getInfo(url); // Get video info
    const videoUrl = videoInfo.streams[0].url; // Select the first stream URL (high quality)
    
    react(sock, m, M, emoji());

    await XVDL.download(url, { type: "hq" }).pipe(fs.createWriteStream(videoFileName));
    react(sock, m, M, emoji());

    await sendVideomp4(sock, m, M, videoFileName, tex);

    react(sock, m, M, emoji());
    await fs.unlink(videoFileName);
  } catch (error) {
    console.error('Error during Instagram video download:', error.message || error);
    react(sock, m, M, emoji());
    sendM(sock, m, M, "*I Can't do This right now*");
  }
}

module.exports = xvdl;
