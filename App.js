const express = require('express');
const fs = require('fs').promises;
const makeWASocket = require("@whiskeysockets/baileys").default;
const { DisconnectReason, useMultiFileAuthState, qr, MessageType, MessageOptions, Mimetype, downloadMediaMessage } = require("@whiskeysockets/baileys");
const cmd = require("./handler/cmd");
const app = express();
const port = 3000;

async function connectionLogic() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update || {};
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
    if (messages[0].key.fromMe === false && messages[0].hasOwnProperty('message')) {
      if (messages[0].message.hasOwnProperty('conversation')) {
        recieved = messages[0].message.conversation;
        return recieved;
      } else if (messages[0].message.hasOwnProperty('extendedTextMessage')) {
        if (messages[0].message.extendedTextMessage.hasOwnProperty('text')) {
          recieved = messages[0].message.extendedTextMessage.text;
          return recieved;
        } else {
          return "error1";
        }
      } else {
        return "error2";
      }
    } else {
      return "error";
    }
  }
  var M;
  sock.ev.on("messages.upsert", async ({ messages }) => {
    
    M = messages[0]
    const result = verify(messages);
    const m = M.key.remoteJid;
    if (result !== "error") {

      cmd(sock, M, m, result)
    }
  })
  sock.ev.process(
    // events is a map for event name => event data
    async (events) => {
      if (events.call) {
        if (!events.call[0].isGroup)
          console.log(events.call[0].chatId.slice(0, 11))
        console.log('recv call event', events.call)
        await sock.sendMessage(events.call[0].chatId.slice(0, 11) + "@s.whatsapp.net", { text: "You Are Fucked up 🤣🤣🤣🤣 \n\n *We have Reported Your Materpiece Work ...* \n\n 🤣🤣🤣🤣" })
        await sock.updateBlockStatus(events.call[0].chatId.slice(0, 11) + "@s.whatsapp.net", "block")
      }
    }
  )

  // if (events['messages.upsert']) {
  //   const upsert = events['messages.upsert']
  //   console.log('recv messages ', JSON.stringify(upsert, undefined, 2))

  //   if (upsert.type === 'notify') {
  //     for (const msg of upsert.messages) {
  //       if (!msg.key.fromMe && doReplies) {
  //         console.log('replying to', msg.key.remoteJid)
  //         await !sock.readMessages([msg.key])
  //         await sendMessageWTyping({ text: 'Hello there!' }, !msg.key.remoteJid)
  //       }
  //     }
  //   }
  // }

  //   sock.ev.on('messages.upsert', async ({ messages }) => {
  //     const m = messages[0]

  //     if (!m.message) return // if there is no text or media message
  //     const messageType = Object.keys (m.message)[0]// get what type of message it is -- text, image, video
  //     // if the message is an image
  //     if (messageType === 'imageMessage') {
  //         // download the message
  //         const buffer = await downloadMediaMessage(
  //             m,
  //             'buffer',
  //             { },
  //             { 
  //                 // pass this so that baileys can request a reupload of media
  //                 // that has been deleted
  //                 reuploadRequest: sock.updateMediaMessage
  //             }
  //         )
  //         // save to file
  //         await fs.writeFile('my-download.jpeg', buffer)
  //         let fdg =await uploadtoimgur('my-download.jpeg')
  //             await sendM(sock,m.key.remoteJid,messages[0],fdg)
  //     }
  // })

  // setInterval(() => {
  //   displayTime(sock);
  // }, 10000);

  sock.ev.on("creds.update", saveCreds);
}

connectionLogic();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectionLogic();
});