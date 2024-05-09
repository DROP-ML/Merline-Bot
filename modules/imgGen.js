const lang = require('../handler/lang.json');
const axios = require('axios');
const { react, sendImage } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations

async function generateImages(sock, m,M, text) {

  try {
    const res = await fetch('https://aemt.me/bingimg?text=' + text.slice(5));
    const data = await res.json();
    const imageUrl = data.result;

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const filePath = `${randomNumber}.png`;

    // Fetch the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Write the buffer to a local file
    await fs.writeFile(filePath, Buffer.from(response.data, 'binary'));
    
    await sendImage(sock, m,M, filePath, "°° вєтα тєѕтιηg вσт °°");
    react(sock, m,M, lang.react.success);
    
    // Delete the file from the server
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error during image generation and send:', error.message || error);
    react(sock, m,M, lang.react.error);
  }
}

module.exports = generateImages;
