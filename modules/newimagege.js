const fs = require('fs').promises; // Use fs.promises for async file operations
const mumaker = require('mumaker');
const axios = require('axios');
const lang = require('../handler/lang.json');
const { react, sendImage, sendM } = require('../handler/sendFunction');

async function newimagegen(sock, effectUrl, text, m,M) {

  try {
    const response = await mumaker.photooxy(effectUrl, text);
    react(sock, m,M, lang.react.process);

    if (response.status && response.image) {
      const imageUrl = response.image;
      react(sock, m,M, lang.react.down);

      const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      const imageFileName = `${randomNumber}.png`;

      await fs.writeFile(imageFileName, Buffer.from(imageBuffer.data));
      react(sock, m,M, lang.react.upload);

      await sendImage(sock, m,M, imageFileName, lang.imageCreate.caption);
      react(sock, m,M, lang.react.success);

      await fs.unlink(imageFileName);
    } else {
      sendM(sock, m,M, lang.imageCreate.found);
    }
  } catch (error) {
    console.error('Error during image generation and send:', error.message || error);
    react(sock, m,M, lang.react.error);
  }
}

module.exports = newimagegen;
