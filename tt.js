
const ytdl = require('ytdl-core');
const yts = require('@blackamda/yt-search');

const fs = require('fs');


var url;

async function mp4() {
 
    url = "https://youtu.be/cjomTjygLA4?si=8K1Vmyp9-Z9-KXw1";

    // Validate the URL
    if (ytdl.validateURL(url)) {
        // Generate a random file name
        const info = await ytdl.getInfo(url);
        // Get the video title
        const title = info.videoDetails.title;
        // Replace any invalid characters in the title with underscores
        const fileName = title.replace(/[\\/:*?"<>|]/g, '_') + '.mp4';
        // Download the audio stream from YouTube and save it to the server root directory
        ytdl(url, { filter: 'videoandaudio' })
            .pipe(fs.createWriteStream(fileName))
            .on('finish', async () => {
                const caption = `
*${title}*  

°° вєтα тєѕтιηg вσт °°`
                react(so/ck, m,M, lang.react.upload);
                // sendVideomp4(sock,m,M,fileName,caption)
                // react(sock, m,M, lang.react.success);
                // Delete the file from the server
                // fs.unlinkSync(fileName);
            })
            .on('error', console.error);
    } else {
        // const sentMsg = await sock.sendMessage(m, { text: "*Can't process this event*" }, { quoted: M });
		// react(sock,m,M,lang.react.error);
    }
}

mp4();
