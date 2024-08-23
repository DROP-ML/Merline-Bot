const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const lang = require('../handler/lang.json');
const { sendAudio, appleAudio, react, sendM } = require('../handler/sendFunction');
const yts = require('@blackamda/yt-search');

async function song(sock, m, M, text, type) {
  const url = text.slice(6);

  if (url.match(/youtu/gi)) {
    try {
      const yt = await getYoutubeVideo(url);
      const title = yt.title;
      const thumbnail = yt.thumbnail;
      const id = yt.id;
      const quality = '128kbps';
      const dl_url = await yt.audio[quality].download();

      const messageText = generateMessageText(title, id, thumbnail, quality, yt.audio[quality].fileSizeH);
      await sendM(sock, m, M, messageText);

      const fileName = getSafeFileName(title);
      const filePath = path.join(fileName);

      await downloadAndSendAudio(dl_url, filePath, sock, m, M, type);
    } catch (error) {
      await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
    }
  } else {
    try {
      const results = await yts(url);
      const video = results.videos[0];
      const yt = await getYoutubeVideo(video.url);
      const title = yt.title;
      const thumbnail = yt.thumbnail;
      const id = yt.id;
      const quality = '128kbps';
      const dl_url = await yt.audio[quality].download();

      const messageText = generateMessageText(title, id, thumbnail, quality, yt.audio[quality].fileSizeH);
      await sendM(sock, m, M, messageText);

      const fileName = getSafeFileName(title);
      const filePath = path.join(fileName);

      await downloadAndSendAudio(dl_url, filePath, sock, m, M, type);
    } catch (error) {
      await sendM(sock, m, M, `❎ Error processing the request: ${error.message}`);
    }
  }
}

async function getYoutubeVideo(url) {
  try {
    return await youtubedl(url).catch(async () => await youtubedlv2(url));
  } catch (error) {
    throw error;
  }
}

function generateMessageText(title, id, thumbnail, quality, fileSizeH) {
  return `🎵 *Title:* ${title}\n\n` +
         `🔗 *Video ID:* ${id}\n\n` +
         `📸 *Thumbnail:* ${thumbnail}\n\n` +
         `🎧 *Audio Quality:*\n` +
         `   - ${quality}: ${fileSizeH}\n\n` +
         `🔥 *Don't miss out!* 🔥`;
}

function getSafeFileName(title) {
  return title.replace(/[\\/:*?"<>|]/g, '_') + '.mp3';
}

async function downloadAndSendAudio(dl_url, filePath, sock, m, M, type) {
  try {
    const response = await axios({
      method: 'get',
      url: dl_url,
      responseType: 'stream'
    });

    const fileStream = fs.createWriteStream(filePath);
    response.data.pipe(fileStream);

    fileStream.on('finish', async () => {
      await fileStream.close();
      console.log(`✅ Download completed: ${filePath}`);
      await react(sock, m, M, lang.react.upload);
      if (type === "android") {
        await sendAudio(sock, m, M, filePath);
      } else {
        await appleAudio(sock, m, M, filePath);
      }
      await react(sock, m, M, lang.react.success);
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    fs.unlink(filePath, () => {});
    await sendM(sock, m, M, `❎ Error downloading the audio: ${err.message}`);
  }
}

module.exports = song;
