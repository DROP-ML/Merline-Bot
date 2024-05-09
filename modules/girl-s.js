const axios = require('axios');
const lang = require('../handler/lang.json');
const { cv } = require('./catch');
const { react, sendM, sendImage } = require('../handler/sendFunction');
const fs = require('fs').promises; // Use fs.promises for async file operations

async function sendGirl(sock, m, M, imageUrl, country) {

    const randomNumber = Math.floor(Math.random() * 10000000000) + 1;
    const outputPath = `${randomNumber}.png`;

    // Make a GET request using Axios
    const response = await axios({
        method: 'get',
        url: 'https://aemt.me/china',
        responseType: 'arraybuffer',
    })
    try {
        await fs.writeFile(outputPath, Buffer.from(response.data, 'binary'));
        await sendImage(sock, m, M, outputPath, `${country} Image Downloader`)
        react(sock, m, M, lang.react.success);
        await fs.unlink(outputPath);
    } catch (error) {
        console.error('Error downloading image:', error.message);
        react(sock, m, M, lang.react.error);
    };

}

module.exports = sendGirl;