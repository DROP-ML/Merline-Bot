const { sendVoice, sendM, sendImage } = require("../handler/sendFunction");

async function alive(sock, m, M) {
    await sendVoice(sock, m, M, "./src/MerlinIntro.mp3");
    await sendImage(sock, m, M, "./src/merlin.jpg", `
    🔮 *Merlin Userbot is Alive and Active!* 🔮

🌐 **Platform:** WhatsApp
🚀 **Version:** 2.0.6

👋 *Greetings, User!* I am Merlin, your loyal and powerful WhatsApp userbot. I'm fully operational and ready to assist you with all your magical needs!

👨‍💻 **Developer:** *Dark Boss*
📚 **Documentation:** Just type .panel to explore my powers!

✨ **Key Features:**
- 🧙‍♂️ Executes your commands with ease
- ✨ Performs magical tasks to enhance your WhatsApp experience
- 🔮 Always ready to make your day a little more enchanting

✨ Stay magical, and don’t hesitate to ask for anything you need!

    `);
}

module.exports = alive;
