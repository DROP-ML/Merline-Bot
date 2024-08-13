const express = require('express');
const fs = require('fs').promises;
const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const cmd = require("./handler/cmd");
const app = express();
const port = 8000;

async function connectionLogic() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update || {}; // Corrected the placement of 'qr' within the destructuring statement.
    if (qr) {
      console.log(qr);
    }
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        connectionLogic();
      }
    }
  });

  function verify(messages) {
    let received; // Declare 'received' correctly at the top of the function
    if (messages[0].key.fromMe === false && messages[0].hasOwnProperty('message')) {
      if (messages[0].message.hasOwnProperty('conversation')) {
        received = messages[0].message.conversation;
        return received;
      } else if (messages[0].message.hasOwnProperty('extendedTextMessage')) {
        if (messages[0].message.extendedTextMessage.hasOwnProperty('text')) {
          received = messages[0].message.extendedTextMessage.text;
          return received;
        } else {
          return "error1";
        }
      } else {
        return "error2";
      }
    } else {
      return "error3";
    }
  }

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const message = messages[0];
    const result = verify(messages);
    const remoteJid = message.key.remoteJid;
    if (result !== "error3") { // Fixed to match returned error string in 'verify' function
      cmd(sock, message, remoteJid, result);
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

connectionLogic();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
