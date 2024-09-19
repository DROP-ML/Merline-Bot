const fs = require('fs');
const compressVideo = require('../modules/comressor');

const react = (sock, m, M, emoji) => {
  sock.sendMessage(m, {
    react: {
      text: emoji,
      key: M.key
    }
  });
};

const sendM = async (sock, m, M, message) => {
  await sock.sendMessage(m, { text: message }, { quoted: M });
}

const sendImage = async (sock, m, M, file, cap) => {
  await sock.sendMessage(m, {
    image: { url: './' + file },
    caption: cap
  }, { quoted: M });
}

const sendAudio = async (sock, m, M, audio) => {
  await sock.sendMessage(m, { audio: { url: './' + audio }, mimetype: 'audio/mpeg' }, { quoted: M });
}

const sendVoice = async (sock, m, M, audio) => {
  await sock.sendMessage(m, { audio: { url: './' + audio }, mimetype: 'audio/mpeg', ptt: true, waveform: [100, 0, 100, 0, 100, 0, 100] }, { quoted: M });
}

const appleAudio = async (sock, m, M, audio, cap) => {
  await sock.sendMessage(m, { document: { url: './' + audio }, mimetype: 'audio/mp3', fileName: audio, caption: cap }, { quoted: M });
}

const sendVideomp4 = async (sock, m, M, video, cap) => {
  await sock.sendMessage(
    m,
    {
      video: fs.readFileSync('./' + video),
      caption: cap,
      gifPlayback: false
    }, { quoted: M })

}

module.exports = { react, sendM, sendImage, sendAudio, appleAudio, sendVideomp4, sendVoice };