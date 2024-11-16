const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
const lang = require('../handler/lang.json');
const { sendAudio, appleAudio, react, sendM } = require('../handler/sendFunction');
const yts = require('@blackamda/yt-search');

async function song(sock, m, M, text, type) {
    let url;

    // Extract the URL or keyword from the input text
    url = text.slice(6);

    // If the input is a valid YouTube URL
    if (url.match(/youtu/gi)) {
        try {
            // Set a random file name
            const randomNumber = Math.floor(Math.random() * 100000) + 1;
            const outputFileName = `${randomNumber}.webm`; // Force .mp3 extension
            const outputPath = path.join(__dirname, outputFileName);

            // Download the audio using youtube-dl-exec
            await youtubedl(url, {
                extractAudio: true,
                audioFormat: 'mp3',
                output: outputPath,
            });

            console.log(`✅ Download completed: Saved as ${outputFileName}`);

            let messageText = `🎵 'Title': Download completed`;

            await sendM(sock, m, M, messageText);

            // Send the downloaded audio
            await react(sock, m, M, lang.react.upload);
            if (type == "android") {
                await sendAudio(sock, m, M, 'modules/' + outputFileName);
            } else {
                await appleAudio(sock, m, M, 'modules/' + outputFileName);
            }

            await react(sock, m, M, lang.react.success);

            // Delete the file after sending it
            fs.unlinkSync('modules/' + outputFileName);

        } catch (error) {
            await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
        }

    } else {
        // If the input is a keyword, search for it
        const results = await yts(url);
        let messageText = '';
        const res = results.videos.slice(0, 1);
        await Promise.all(res.map(async (video) => {
            const videoUrl = video.url;
            // Set a random file name
            const randomNumber = Math.floor(Math.random() * 100000) + 1;
            const outputFileName = `${randomNumber}.webm`; // Force .mp3 extension
            const outputPath = path.join(__dirname, outputFileName);

            // Download the audio using youtube-dl-exec
            await youtubedl(videoUrl, {
                extractAudio: true,
                audioFormat: 'mp3',
                output: outputPath,
            });

            console.log(`✅ Download completed: Saved as ${outputFileName}`);

            messageText += `🎵 'Title': ${video.title}`;

            await sendM(sock, m, M, messageText);

            // Send the downloaded audio
            await react(sock, m, M, lang.react.upload);
            if (type == "android") {
                await sendAudio(sock, m, M, 'modules/' + outputFileName);
            } else {
                await appleAudio(sock, m, M, 'modules/' + outputFileName);
            }

            await react(sock, m, M, lang.react.success);

            // Delete the file after sending it
            fs.unlinkSync('modules/' + outputFileName);
        }));
    }
}

module.exports = song;
