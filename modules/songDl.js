
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
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
            // Set the desired audio quality
            const quality = '128kbps';
            // Attempt to fetch video information
            const yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
            console.log(yt);
            // Get the download link for the audio
            const dl_url = await yt.audio[quality].download();
            // Get the video title and other details
            const title = await yt.title;
            const thumbnail = yt.thumbnail;
            const id = yt.id;

            // Generate a message for the download process
            // let messageText = `🎵 *Title:* ${title}\n\n` +
            //     `🔗 *Video ID:* ${id}\n\n` +
            //     `📸 *Thumbnail:* ${thumbnail}\n\n` +
            //     `🎧 *Audio Quality:*\n` +
            //     `   - ${quality}: ${yt.audio[quality].fileSizeH}\n\n` +
            //     `🔥 *Don't miss out!* 🔥`;

            let messageText = `🎵 'Title': ${title}`;

            await sendM(sock, m, M, messageText);

            // Generate a safe file name
            const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
            // Define the file path
            const filePath = path.join(__dirname, fileName);

            // Create a write stream to save the file
            const fileStream = fs.createWriteStream(filePath);

            // Fetch and save the audio
            require('https').get(dl_url, (response) => {
                response.pipe(fileStream);
                fileStream.on('finish', async () => {
                    fileStream.close();
                    console.log(`✅ Download completed: ${filePath}`);
                    await react(sock, m, M, lang.react.upload);
                    if (type == "android") {
                        await sendAudio(sock, m, M, 'modules/' + fileName);
                    } else {
                        await appleAudio(sock, m, M, 'modules/' + fileName);
                    }
                    await react(sock, m, M, lang.react.success);
                    fs.unlinkSync('modules/' + fileName);
                });
            }).on('error', (err) => {
                fs.unlink('modules/' + fileName, () => { }); // Delete the file if an error occurs
                sendM(sock, m, M, `❎ Error downloading the audio: ${err.message}`);
            });
        } catch (error) {
            await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
        }

    } else {
        // If the input is a keyword, search for it
        const results = await yts(url);
        let messageText = '';
        const res = results.videos.slice(0, 1);
        await Promise.all(res.map(async (video) => {
            const yt = await youtubedl(video.url).catch(async () => await youtubedlv2(video.url));
            const dl_url = await yt.audio['128kbps'].download();
            const title = await yt.title;
            const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
            const filePath = path.join(__dirname, fileName);

            // Send the initial message about the audio
            // messageText += `🎵 *Title:* ${title}\n\n` +
            //     `🔗 *Video ID:* ${yt.id}\n\n` +
            //     `📸 *Thumbnail:* ${yt.thumbnail}\n\n` +
            //     `🎧 *Audio Quality:*\n` +
            //     `   - 128kbps: ${yt.audio['128kbps'].fileSizeH}\n\n` +
            //     `🔥 *Don't miss out!* 🔥`;

            messageText += `🎵 'Title': ${title}`;

            await sendM(sock, m, M, messageText);

            // Create a write stream to save the file
            const fileStream = fs.createWriteStream(filePath);
            require('https').get(dl_url, (response) => {
                response.pipe(fileStream);
                fileStream.on('finish', async () => {
                    await fileStream.close();
                    console.log(`✅ Download completed: ${filePath}`);
                    await react(sock, m, M, lang.react.upload);
                    if (type == "android") {
                        await sendAudio(sock, m, M, 'modules/' + fileName);
                    } else {
                        await appleAudio(sock, m, M, 'modules/' + fileName);
                    }
                    react(sock, m, M, lang.react.success);
                    fs.unlinkSync('modules/' + fileName);
                });
            }).on('error', (err) => {
                fs.unlink('modules/' + fileName, () => { });
                sendM(sock, m, M, `❎ Error downloading the audio: ${err.message}`);
            });
        }));
    }
}

module.exports = song;
