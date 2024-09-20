const axios = require('axios');
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs').promises; // Use promises for async file operations

async function ytdl2(v, imageFileName) {
    try {
        const q = '128kbps';
        const yt = await youtubedl(v).catch(async () => await youtubedlv2(v));
        console.log(yt)
        const dl_url = await yt.audio[q].download();
        const title = yt.title;
        const thumbnail = yt.thumbnail;
        console.log(dl_url);

        const response = await axios({
            method: 'get',
            url: thumbnail,
            responseType: 'arraybuffer',
        });

        try {
            await fs.writeFile(imageFileName, Buffer.from(response.data, 'binary'));
            // Additional operations (e.g., sending the image, unlinking the file) can go here
        } catch (error) {
            console.error('Error saving the image:', error.message);
        }
    } catch (error) {
        console.error('Error in downloading or processing:', error.message);
    }
}

ytdl2('https://youtu.be/oAVhUAaVCVQ?si=W5l4OwDrv_jmFgI2', 'thumbnail.png');
