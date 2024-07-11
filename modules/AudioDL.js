const axios = require('axios');
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs'); // Use fs.promises for async file operations
const randomNumber = Math.floor(Math.random() * 100000) + 1;
const videoFileName = `${randomNumber}.mp3`;

async function ytdl2(v , videoFileName) {


  try {
    let q = '128kbps'
    // let v = "2"
    const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
    const dl_url = await yt.audio[q].download()
    const title = await yt.title
    console.log(dl_url)
    await downloadFile(dl_url,videoFileName).then(async () => {

    })
    .catch(error => console.error('Error downloading file:', error));
  } catch {
    
  }

  async function downloadFile(url, outputPath) {
    const writer = fs.createWriteStream(outputPath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}
}

module.exports = ytdl2;
