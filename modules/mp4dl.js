const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs');
const { ytmp4 } = require('ruhend-scraper')
const path = require('path');
const lang = require('../handler/lang.json');
const { sendVideomp4, react } = require('../handler/sendFunction');

async function mp4(sock, m, M, text) {
    let url;

    url = text.slice(7).trim(); // Extract URL from text

    if (url.match(/youtu/gi)) {
        try {
            // Fetch video information using @bochilteam/scraper
            const data = await ytmp4(url)
            const dl_url = await data.video; // Download URL for selected video quality
            const title = await data.title; // Video title
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
                    await react(sock, m, M, lang.react.upload);
                    await sendVideomp4(sock, m, M, 'modules/'+fileName, caption);
                    await react(sock, m, M, lang.react.success);
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
        await sock.sendMessage(m, { text: "Not for you BigHead .... !" }, { quoted: M });
        await react(sock, m, M, lang.react.error);
    }
}

module.exports = mp4;
