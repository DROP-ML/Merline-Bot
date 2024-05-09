const { sendImage, react } = require("../handler/sendFunction");
const lang = require('../handler/lang.json');
const fs = require('fs').promises; // Use fs.promises for async file operations
const { default: axios } = require("axios");

async function dall_e(sock, m, M, text) {

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const outputPath = `${randomNumber}.png`;
    react(sock,m,M,lang.react.process)

    const imageUrl = 'https://aemt.me/dalle?text=' + text; // Replace with your image URL

    // Make a GET request using Axios
    const response = await axios({
        method: 'get',
        url: imageUrl,
        responseType: 'arraybuffer',
    })
    try {
        fs.writeFile(outputPath, Buffer.from(response.data, 'binary'));
        await sendImage(sock, m, M, outputPath, "DALL-E Image Creation")
        react(sock, m, M, lang.react.success);
        await fs.unlink(outputPath);
    } catch (error) {
        console.error('Error downloading image:', error.message);
        react(sock, m, M, lang.react.error);
    };

}

module.exports = dall_e;