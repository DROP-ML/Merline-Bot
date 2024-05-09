const moment = require('moment-timezone');

function getCurrentTime() {
  const currentTime = moment().tz('Asia/Colombo');
  return currentTime.format('hh:mm:ss A');
}

async function displayTime(sock) {
    let bio = `\n🟢 Time Active ${getCurrentTime()}\n\n ┃ 💎  By Shevo`;
  await sock.updateProfileStatus(bio)
}

// Set up an interval to display time every two minutes
; // 2 minutes in milliseconds
module.exports = displayTime;
