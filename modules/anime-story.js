const axios = require('axios');
const lang = require('../handler/lang.json');
const {cv} = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 100000000000000000000000000000000000000) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function anime_story(sock, m, M) {
    react(sock,m,M,lang.react.process)
  try {

    const response = await axios.get(`https://aemt.me/download/storyanime`);
    const data = response.data;

    if (data.code == 200) {
      react(sock, m,M, lang.react.down);

      const videoResponse = await axios.get(data.result.title, { responseType: 'arraybuffer' });

      await fs.writeFile(videoFileName, Buffer.from(videoResponse.data));
      react(sock, m,M, lang.react.process);

      sendVideomp4(sock,m,M,videoFileName)

      react(sock, m,M, lang.react.success);
      await fs.unlink(videoFileName);
    } else {
      react(sock, m, M, lang.react.error)
      await sendM(sock, m, M, "*Anime Story Is Missed ...*")
    }
  } catch (error) {
    console.error('Error during Anime video download:', error.message || error);
    react(sock, m, M, lang.react.error)
    sendM(sock, m, M, "*I Can't do it right now*")
  }
}

module.exports = anime_story;
