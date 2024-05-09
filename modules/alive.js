const { sendVoice, sendM, sendImage } = require("../handler/sendFunction");

async function alive(sock,m,M){
    await sendVoice(sock,m,M,"./src/MerlinIntro.mp3")
    await sendImage(sock,m,M,"./src/merlin.jpg",`
    🔮 *Merlin Userbot Alive!* 🔮

🌐 **Platform:** WhatsApp
🚀 **Version:** 2.0.0

🤖 *Hello there!* I am Merlin, your trusty WhatsApp userbot, and I'm alive and kicking! Ready to assist you with all your magical commands and tasks.

👩‍💻 **Developer:** *Dark Boss*
📚 **Documentation:** send .panel Command

🌟 **Features:**
- Responds to commands
- Performs magical tasks
- Ready to make your WhatsApp experience enchanting

🔗 **Useful Links:**
- [GitHub Repository](https://github.com/ISURU11221/Merlin)
- [Issue Tracker](https://github.com/ISURU11221/Merlin/issues)
- [Join our Community](https://chat.whatsapp.com/IbRGxbhVVcuEDi8uKXN5wO)

🔮 Stay magical, and feel free to ask me anything!

*Note: Replace the evry command start point ' . ' (dot), [Link to Documentation], etc., with your actual information and links.*

    `)
}

module.exports = alive;