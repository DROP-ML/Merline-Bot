const lang = require("../handler/lang.json");
const { sendM, react } = require("../handler/sendFunction");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyB4u1vwOCQtl7y2ax87yDDWdh34mCK-r4k');

async function gemini(sock, m, M, result) {
    const gemitext = result
    if (gemitext !== "") {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result9 = await model.generateContent(gemitext);
            const ress = result9.response;
            const textt = ress.text();
            
            await sendM(sock, m, M, textt)
            react(sock, m, M, lang.react.success)
        } catch (error) {
            sendM(sock, m, M, lang.chatBots.geminiUnvailable)
            react(sock, m, M, lang.react.error)
        }
    } else {
        await sendM(sock, m, M, lang.chatBots.addPrompt)
        react(sock, m, M, lang.react.error)
    }
}

module.exports = gemini;