const lang = require('../handler/lang.json');
const ytdl2 = require('./AudioDL.js');
const ytdl = require('ytdl-core');
const yts = require('@blackamda/yt-search');

const fs = require('fs');
const { sendAudio, appleAudio, react, sendM } = require('../handler/sendFunction');
async function song() {
    const randomNumber = Math.floor(Math.random() * 100000) + 1;
    const videoFileName = `${randomNumber}.mp3`;

    var url = "https://youtu.be/oAVhUAaVCVQ?si=qrYiGIVJvXfAmJ1S";


    if (ytdl.validateURL(url)) {
        await ytdl2(url, videoFileName).then(async () => {

        })
            .catch(error => console.error('Error downloading file:', error));
    } else {
        let results = await yts(url);
        const res = results.videos.slice(0, 1)
        var ff;
        await res.forEach(async (video) => {
            ff = `${video.url}`;


            await ytdl2(ff, videoFileName).then(async () => {


            })
                .catch(error => console.error('Error downloading file:', error));
        });

    }
}
song();

