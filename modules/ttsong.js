const lang = require('../handler/lang.json');
const fg = require('api-dylux');
const axios = require('axios');
const fs = require('fs');
const { sendM, react, sendAudio } = require('../handler/sendFunction');

async function ttsong(sock,m,M,result){
    const ttsong = result.slice(8);
          const randomNumber = Math.floor(Math.random() * 10) + 1;
          const outputPath = `${randomNumber}.mp4`;
          if (ttsong !== "") {
            const data = await fg.tiktok2(ttsong);
            await axios({
              method: 'GET',
              url: data.music.play_url,
              responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
            })
              .then(response => {
                // Write the buffer to a local file
                fs.writeFileSync(outputPath, Buffer.from(response.data, 'binary'));
                react(sock, m,M, lang.react.upload);
                sendAudio(sock,m,M,outputPath);
                react(sock, m,M, lang.react.success);
                fs.unlinkSync(outputPath);
              })
              .catch(error => {
                sendM(sock,m,M,"*Song Downloading error*")
              });
            react(sock, m,M, "🔖")
          } else {
            await sendM(sock,m,M,"*Please provide a tiktok link*")
          }
}

module.exports = ttsong;