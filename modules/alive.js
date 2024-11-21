const { sendVoice, sendM, sendImage } = require("../handler/sendFunction");

async function alive(sock, m, M) {
    await sendVoice(sock, m, M, "./src/MerlinIntro.mp3");
    await sendImage(sock, m, M, "./src/merlin.jpg", `
        🔮 *Merlin Userbot is Alive and Ready to Assist!* 🔮
    
    🌟 **A Global Thank You:**  
    We extend our deepest gratitude to **Queen Amdi** and the innovative **WhatsApp Userbot Black Amda's** team. Your contributions and support have been instrumental in shaping Merlin into the powerful tool it is today. Together, we continue to redefine excellence in userbot technology.  
    
    🌐 **Platform:** WhatsApp  
    🚀 **Version:** 2.0.6  
    
    👋 *Hello, World!* I am Merlin, your versatile and intelligent WhatsApp userbot. Fully operational and ready to simplify your digital experience with cutting-edge features and seamless functionality.  
    
    👨‍💻 **Developer:** *Dark Boss*  
    📚 **Explore My Features:** Just type .panel to unlock my capabilities!  
    
    ✨ **Key Highlights:**  
    - ⚡ Swiftly executes your commands with precision  
    - ✨ Enhances your WhatsApp interactions with advanced automation  
    - 🌍 Designed to cater to users across the globe, 24/7  
    
    🔒 **Stay Secure:** Powered by robust technology to ensure your data remains protected.  
    
    🌟 Thank you for choosing Merlin to elevate your WhatsApp experience. With the inspiration of **Queen Amdi** and the legacy of **Black Amda's**, we are here to make every interaction extraordinary!  
    `);
    
}

module.exports = alive;
