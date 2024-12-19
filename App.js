const express = require('express');
const fs = require('fs').promises;
const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const cmd = require("./handler/cmd");
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

async function connectionLogic() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        markOnlineOnConnect: false,
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update || {};
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
        let received;
        if (messages[0].hasOwnProperty('message')) {
            if (messages[0].message.hasOwnProperty('conversation')) {
                received = messages[0].message.conversation;
                return received;
            } else if (messages[0].message.hasOwnProperty('extendedTextMessage')) {
                if (messages[0].message.extendedTextMessage.hasOwnProperty('text')) {
                    received = messages[0].message.extendedTextMessage.text;
                    return received;
                } else {
                    return "error3";
                }
            } else {
                return "error3";
            }
        } else {
            return "error3";
        }
    }

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const message = messages[0];
        const result = verify(messages);
        const remoteJid = message.key.remoteJid;
        if (result !== "error3") {
            cmd(sock, message, remoteJid, result);
        }
    });

    sock.ev.on("creds.update", saveCreds);

}

connectionLogic();

// API route to send a message to a specific WhatsApp user
app.post('/send-message', async (req, res) => {
    const { phoneNumber, text } = req.body;

    if (!phoneNumber || !text) {
        return res.status(400).json({ error: 'Phone number and text are required.' });
    }

    const jid = `${phoneNumber}@s.whatsapp.net`; // Convert to WhatsApp ID format

    try {
        await sock.sendMessage(jid, { text });
        return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Failed to send message.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
