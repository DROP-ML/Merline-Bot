//      Checked 05/25/2024


const lang = require('../handler/lang.json');
const { sendM, react } = require('../handler/sendFunction');
const yts = require('@blackamda/yt-search');

async function search(sock, m,M, text, name) {
  try {
    const videoName = text.slice(4);
    
    const results = await yts(videoName);
    let messageText = `Hello, *${name}*\n\n${lang.struc.ytSearchHead}\n\n`;

    const res = results.videos.slice(0, 5);
    res.forEach((video) => {
      messageText += `*🐋 Title:* ${video.title}\n*⚜️ URL:* ${video.url}\n\n`;
    });

    messageText += lang.struc.footer;
    sendM(sock, m,M, messageText);
    react(sock, m,M, lang.react.success);
  } catch (error) {
    console.error('Error during search:', error.message || error);
    sendM(sock, m,M, 'Error fetching search results.');
    react(sock, m,M, lang.react.error);
  }
}

module.exports = search;
