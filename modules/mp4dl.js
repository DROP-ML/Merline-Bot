const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs');
const path = require('path');
const lang = require('../handler/lang.json');
const { sendVideomp4, react } = require('../handler/sendFunction');
const emoji = require('./emoji');

async function mp4(sock, m, M, text) {
    let url;

    url = text.slice(7).trim(); // Extract URL from text

    if (url.match(/youtu/gi)) {
        try {
            // Fetch video information using @bochilteam/scraper
            const yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
            const videoQuality = '720p'; // Desired quality
            const dl_url = await yt.video[videoQuality].download(); // Download URL for selected video quality
            const title = await yt.title; // Video title
            const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp4'; // File name with sanitized title
            const filePath = path.join(__dirname, fileName);

            // Create a write stream to save the video file
            const fileStream = fs.createWriteStream(filePath);

            // Download the video
            require('https').get(dl_url, (response) => {
                response.pipe(fileStream);
                fileStream.on('finish', async () => {
                    await fileStream.close();
                    console.log(`✅ Download completed: ${filePath}`);
                    const caption = `
*${title}*  

°° вєтα тєѕтιηg вσт °°`;
                    await react(sock, m, M, emoji());
                    await sendVideomp4(sock, m, M, 'modules/'+fileName, caption);
                    await react(sock, m, M, emoji());
                    fs.unlinkSync('modules/'+fileName); // Clean up the file after sending
                });
            }).on('error', (err) => {
                fs.unlink('modules/'+fileName, () => {});
                sendM(sock, m, M, `❎ Error downloading the video: ${err.message}`);
            });
        } catch (error) {
            await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
            return;
        }
    } else {
        await sock.sendMessage(m, { text: "*Can't process this event*" }, { quoted: M });
        await react(sock, m, M, lang.react.error);
    }
}

module.exports = mp4;
