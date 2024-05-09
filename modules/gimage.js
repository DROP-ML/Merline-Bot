const { sendImage, react } = require("../handler/sendFunction");
const lang = require('../handler/lang.json');
const fs = require('fs').promises; // Use fs.promises for async file operations
const { default: axios } = require("axios");

async function gimage(sock, m, M, text) {

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const outputPath = `${randomNumber}.png`;

    const imageUrl = 'https://aemt.me/gimage?query=' + text; // Replace with your image URL

    // Make a GET request using Axios
    const response = await axios({
        method: 'get',
        url: imageUrl,
        responseType: 'arraybuffer',
    })
    try {
        fs.writeFileSync(outputPath, Buffer.from(response.data, 'binary'));
        await sendImage(sock, m, M, outputPath, "Google Image Downloader")
        react(sock, m, M, lang.react.success);
        await fs.unlink(outputPath);
    } catch (error) {
        console.error('Error downloading image:', error.message);
        react(sock, m, M, lang.react.error);
    };

}

module.exports = gimage;