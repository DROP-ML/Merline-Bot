const fs = require('fs');
const mumaker = require('mumaker');
const axios = require('axios');
const lang = require('../handler/lang.json');
const { react, sendImage, sendM } = require('../handler/sendFunction');

async function generateImageAndSend(sock, effectUrl, text, m,M) {

  try {
    const response = await mumaker.textpro(effectUrl, text);
    react(sock, m,M, lang.react.process);

    if (response.image) {
      const imageUrl = response.image;
      react(sock, m,M, lang.react.down);

      const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      const imageFileName = `${randomNumber}.png`;

      fs.writeFileSync(imageFileName, imageBuffer.data);
      react(sock, m,M, lang.react.upload);

      await sendImage(sock, m,M, imageFileName, lang.imageCreate.caption);
      react(sock, m,M, lang.react.success);

      fs.unlinkSync(imageFileName);
    } else {
      sendM(sock, m,M, lang.imageCreate.found);
    }
  } catch (error) {
    console.error('Error during image generation and send:', error.message || error);
    react(sock, m,M, lang.react.error);
  }
}

module.exports = generateImageAndSend;
