const axios = require('axios');
const lang = require('../handler/lang.json');
const { cv } = require('./catch');
const { react, sendM, sendVideomp4 } = require('../handler/sendFunction');
const compressVideo = require('./comressor');
const fs = require('fs').promises; // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 100) + 1;
const videoFileName = `${randomNumber}.mp4`;

async function thread(sock, m, M, text) {

    var url = text
    let hasPipe = url.includes("|");
    var tex = "°° вєтα тєѕтιηg вσт °°";
    if (hasPipe) {
        const gh = await cv(url);
        url = gh.a;
        tex = gh.b;
    }
    try {

        const response = await fetch(`https://aemt.me/download/threads?url=${url}`);
        const data = await response.json();
        var videoURL = data.result.video_urls[0].download_url;
        // if (data.code === "200") {
        console.log(data.result.video_urls)

        react(sock, m, M, lang.react.process);

        const response2 = await axios.get(videoURL, { responseType: 'arraybuffer' });
        try {
            console.log(response2)

            await fs.writeFile(videoFileName, Buffer.from(response2.data));
        } catch (error) {
            console.log("error")
        }
        // let gf = await compressVideo(sock, m, M, videoFileName, tex);
        sendVideomp4(sock,m,M,videoFileName,tex)
        react(sock, m, M, lang.react.success);
        await fs.unlink(videoFileName);
    } catch (error) {
        console.error('Error during Thread video download:', error.message || error);
        react(sock, m, M, lang.react.error)
        sendM(sock, m, M, "*Can't Process This Operation!*")
    }
}

module.exports = thread;
