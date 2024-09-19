const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs');
const path = require('path');
const axios = require('axios');  // Added axios for downloading
const lang = require('../handler/lang.json');
const { sendAudio, appleAudio, react, sendM } = require('../handler/sendFunction');
const yts = require('@blackamda/yt-search');
const { ytdown } = require("shaon-media-downloader");

async function song(sock, m, M, text, type) {
    let url = text.slice(6).trim();  // Extract the word or URL after the command

    try {
        // Check if the input is a valid YouTube URL or a keyword
        if (url.match(/youtu/gi)) {
            // If it's a YouTube URL, proceed to download the audio
            await processYouTubeURL(sock, m, M, url, type);
        } else {
            // If it's a keyword, search YouTube for the top result and download the audio
            const searchResults = await yts(url);
            if (searchResults && searchResults.videos.length > 0) {
                const firstResult = searchResults.videos[0];
                await processYouTubeURL(sock, m, M, firstResult.url, type);
            } else {
                await sendM(sock, m, M, "❎ No results found for the provided keyword.");
            }
        }
    } catch (error) {
        await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
    }
}

async function processYouTubeURL(sock, m, M, url, type) {
    try {
        // Fetch the YouTube video details and audio download link
        const yt = await ytdown(url);
        const dl_url = yt.data.audio;
        const title = yt.data.title;

        // Generate a message for the download process
        const messageText = `🎵 *Title:* ${title}`;
        await sendM(sock, m, M, messageText);

        // Generate a safe file name and define the file path
        const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
        const filePath = path.join(__dirname, fileName);

        // Download and save the audio using axios
        const response = await axios({
            method: 'get',
            url: dl_url,
            responseType: 'stream'
        });

        const fileStream = fs.createWriteStream(filePath);

        // Pipe the response data to the file stream
        response.data.pipe(fileStream);

        fileStream.on('finish', async () => {
            fileStream.close();
            console.log(`✅ Download completed: ${filePath}`);
            await react(sock, m, M, lang.react.upload);

            if (type === "android") {
                await sendAudio(sock, m, M, 'modules/' + fileName);
            } else {
                await appleAudio(sock, m, M, 'modules/' + fileName);
            }

            await react(sock, m, M, lang.react.success);
            fs.unlinkSync('modules/' + fileName);  // Delete the file after sending
        });

        fileStream.on('error', (err) => {
            fs.unlinkSync(filePath);  // Delete the file in case of an error
            sendM(sock, m, M, `❎ Error downloading the audio: ${err.message}`);
        });
    } catch (error) {
        await sendM(sock, m, M, `❎ Error processing the YouTube URL: ${error.message}`);
    }
}

module.exports = song;
