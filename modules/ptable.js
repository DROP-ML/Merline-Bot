const lang = require('../handler/lang.json');
const axios = require('axios');
const { sendM, react, sendImage } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations

async function periodict(sock, m,M, text) {

  try {
    const response = await fetch(`https://api.popcat.xyz/periodic-table?element=${text}`);
    const responseData = await response.json();

    if (!responseData.image) {
      throw new Error('Image not found in the response');
    }

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const filePath = `${randomNumber}.png`;

    const imageBuffer = await axios.get(responseData.image, { responseType: 'arraybuffer' });
    await fs.writeFile(filePath, Buffer.from(imageBuffer.data));

    await sendImage(sock, m,M, filePath, `
🌟 **Element Details** 🌟

**Name**: ${responseData.name}
**Symbol**: ${responseData.symbol}
**Atomic Number**: ${responseData.atomic_number}
**Atomic Mass**: ${responseData.atomic_mass}
**Period**: ${responseData.period}
**Phase**: ${responseData.phase}
**Discovered by**: ${responseData.discovered_by}
            
📖 **Summary**:
${responseData.summary}
            
🚀 **Wishing you the best on your journey with ${M.pushName}! Goodbye!**
    `);

    react(sock, m,M, lang.react.success);

    // Delete the file from the server
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error during periodict:', error.message || error);
    await sendM(sock,m,M,"*Given Name Invalid*")
  }
}

module.exports = periodict;
