const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs');
const path = require('path');
const lang = require('../handler/lang.json');
const { sendAudio, appleAudio, react, sendM } = require('../handler/sendFunction');
const yts = require('@blackamda/yt-search');

async function song(sock, m, M, text, type) {
    let url = text.slice(6); // Extract the URL or keyword from the input text

    if (url.match(/youtu/gi)) { // If the input is a valid YouTube URL
        try {
            const quality = '128kbps';
            const yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
            console.log(yt);
            const dl_url = await yt.audio[quality].download();
            const title = await yt.title;
            const thumbnail = yt.thumbnail;
            const id = yt.id;

            const messageText = `🎵 'Title': ${title}`;
            await sendM(sock, m, M, messageText);

            const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
            const filePath = path.join(__dirname, fileName);

            const fileStream = fs.createWriteStream(filePath);
            require('https').get(dl_url, (response) => {
                response.pipe(fileStream);
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
                    fs.unlinkSync('modules/' + fileName);
                });
            }).on('error', (err) => {
                fs.unlink('modules/' + fileName, () => { }); // Delete the file if an error occurs
                sendM(sock, m, M, `❎ Error downloading the audio: ${err.message}`);
            });
        } catch (error) {
            await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
        }

    } else { // If the input is a keyword, search for it
        try {
            const results = await yts(url);
            const res = results.videos.slice(0, 1);
            for (const video of res) {
                const yt = await youtubedl(video.url).catch(async () => await youtubedlv2(video.url));
                const dl_url = await yt.audio['128kbps'].download();
                const title = await yt.title;

                const messageText = `🎵 'Title': ${title}`;
                await sendM(sock, m, M, messageText);

                const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
                const filePath = path.join(__dirname, fileName);

                const fileStream = fs.createWriteStream(filePath);
                require('https').get(dl_url, (response) => {
                    response.pipe(fileStream);
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
                        fs.unlinkSync('modules/' + fileName);
                    });
                }).on('error', (err) => {
                    fs.unlink('modules/' + fileName, () => { });
                    sendM(sock, m, M, `❎ Error downloading the audio: ${err.message}`);
                });
            }
        } catch (error) {
            await sendM(sock, m, M, `❎ Error searching or processing audio: ${error.message}`);
        }
    }
}

module.exports = song;
