//      Checked 05/25/2024


const lang = require('../handler/lang.json');
const ytdl = require('ytdl-core');
const yts = require('@blackamda/yt-search');

const fs = require('fs');
const { sendAudio, appleAudio, react, sendM } = require('../handler/sendFunction');
async function song(sock,m,M,text,type) {

    var url;

    url = text.slice(6)

    if (ytdl.validateURL(url)) {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
        ytdl(url, { quality: 'lowestaudio' })
            .pipe(fs.createWriteStream(fileName))
            .on('finish', async () => {
                react(sock, m,M, lang.react.upload);
                if (type === "android") {
                    await sendAudio(sock, m,M, fileName);
                } else {
                    await appleAudio(sock, m,M, fileName);
                }
                react(sock, m,M, lang.react.success);
                fs.unlinkSync(fileName);
            })
            .on('error', console.error);
    } else {
        const results = await yts(url);
        var messageText = lang.yt.dl + `\n\n`;
        const res = results.videos.slice(0, 1)
        var ff;
        await res.forEach((video) => {
            messageText += `*🐋 Title:* ${video.title}\n\n*⚜️ URL:* ${video.url}\n\n *🕵🏻‍♂️ Author:* ${video.author.name} \n\n *👀 Dura. :* ${video.timestamp}\n\n`;
            ff = `${video.url}`;
        });
        messageText += lang.struc.footer;
        await sendM(sock, m,M, messageText);
        const info = await ytdl.getInfo(ff);
        const title = info.videoDetails.title;
        const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
        await ytdl(ff, { quality: 'lowestaudio' })
            .pipe(fs.createWriteStream(fileName))
            .on('finish', async () => {
                react(sock, m,M, lang.react.upload);
                if (type === "android") {
                    await sendAudio(sock, m,M, fileName);
                } else {
                    var cap = `\n\n${lang.struc.footer}`;
                    await appleAudio(sock, m,M, fileName, cap);
                }
                react(sock, m,M, lang.react.success);
                fs.unlinkSync(fileName);
            })
            .on('error', console.error);
    }
}
module.exports = song;
