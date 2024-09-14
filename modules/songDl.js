const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs');  // For createWriteStream
const fsPromises = require('fs').promises;
const path = require('path');
const axios = require('axios');
const lang = require('../handler/lang.json');
const { sendAudio, appleAudio, react, sendM, sendImage } = require('../handler/sendFunction');
const yts = require('@blackamda/yt-search');
const emoji = require('./emoji');

async function song(sock, m, M, text, type) {
    const url = text.slice(6);

    try {
        const yt = await getYoutubeVideoFromUrlOrSearch(url);
        const { title, thumbnail, id, audio } = yt;
        const quality = '128kbps';
        const dl_url = await audio[quality].download();

        const messageText = generateMessageText(title, id, thumbnail, quality, audio[quality].fileSizeH);
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        const outputPath = path.join(`${randomNumber}.png`);

        try {
            await downloadAndSendThumbnail(thumbnail, outputPath, sock, m, M, messageText);
        } catch (imageError) {
            console.error('Error downloading image:', imageError.message);
            react(sock, m, M, emoji());
            await sendM(sock, m, M, messageText);
        }

        const fileName = getSafeFileName(title);
        const filePath = path.join(fileName);  // Ensure proper file path construction

        await downloadAndSendAudio(dl_url, fileName, sock, m, M, type);
    } catch (error) {
        console.error('Error processing the request:', error.message);
        await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
    }finally {
        await fsPromises.unlink(fileName); // Safely unlink the file
    }
}

async function getYoutubeVideoFromUrlOrSearch(url) {
    if (url.match(/youtu/gi)) {
        return await getYoutubeVideo(url);
    } else {
        const results = await yts(url);
        const video = results.videos[0];
        return await getYoutubeVideo(video.url);
    }
}

async function getYoutubeVideo(url) {
    try {
        return await youtubedl(url).catch(async () => await youtubedlv2(url));
    } catch (error) {
        throw new Error('Failed to retrieve YouTube video');
    }
}

async function downloadAndSendThumbnail(thumbnailUrl, outputPath, sock, m, M, messageText) {
    const response = await axios({
        method: 'get',
        url: thumbnailUrl,
        responseType: 'arraybuffer',
    });

    await fsPromises.writeFile(outputPath, Buffer.from(response.data, 'binary'));
    await sendImage(sock, m, M, outputPath, messageText);
    await fsPromises.unlink(outputPath);
}

function generateMessageText(title, id, thumbnail, quality, fileSizeH) {
    return `🎵 *Title:* ${title}\n\n` +
        `🔗 *Video ID:* ${id}\n\n` +
        `📸 *Thumbnail:* ${thumbnail}\n\n` +
        `🎧 *Audio Quality:*\n` +
        `   - ${quality}: ${fileSizeH}\n\n` +
        `🔥 *Don't miss out!* 🔥`;
}

function getSafeFileName(title) {
    return title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
}

async function downloadAndSendAudio(dl_url, filePath, sock, m, M, type) {
    try {
        const response = await axios({
            method: 'get',
            url: dl_url,
            responseType: 'stream'
        });

        const fileStream = await fs.createWriteStream(filePath);
        await response.data.pipe(fileStream);

        await fileStream.on('finish', async () => {
            console.log(`✅ Download completed: ${filePath}`);
            await react(sock, m, M, lang.react.upload);
            if (type === "android") {
                await sendAudio(sock, m, M, filePath);
            } else {
                await appleAudio(sock, m, M, filePath);
            }
            await react(sock, m, M, emoji());
        });

        await fileStream.on('error', async (error) => {
            console.error('Error writing file:', error.message);
            await sendM(sock, m, M, `❎ Error downloading the audio: ${error.message}`);
        });

    } catch (err) {
        console.error('Error during audio download:', err.message);
        await sendM(sock, m, M, `❎ Error downloading the audio: ${err.message}`);
    } 
}

module.exports = song;
