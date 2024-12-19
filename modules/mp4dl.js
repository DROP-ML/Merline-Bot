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
            const url5 = 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink';
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587', // Replace with your actual API key
                    'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: url // Replace with the desired URL
                })
            };
            // Fetch video information using @bochilteam/scraper
            const response = await fetch(url5, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json(); // Download URL for selected video quality
            const title = await response.title; // Video title
            const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp4'; // File name with sanitized title
            const filePath = path.join(__dirname, fileName);

            // Create a write stream to save the video file
            const fileStream = fs.createWriteStream(filePath);

            // Download the video
            require('https').get(result.medias[1].url, (response) => {
                response.pipe(fileStream);
                fileStream.on('finish', async () => {
                    await fileStream.close();
                    console.log(`✅ Download completed: ${filePath}`);
                    const caption = `
*${title}*  

°° вєтα тєѕтιηg вσт °°`;
                    await react(sock, m, M, lang.react.upload);
                    await sendVideomp4(sock, m, M, 'modules/' + fileName, caption);
                    await react(sock, m, M, lang.react.success);
                    fs.unlinkSync('modules/' + fileName); // Clean up the file after sending
                });
            }).on('error', (err) => {
                fs.unlink('modules/' + fileName, () => { });
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
