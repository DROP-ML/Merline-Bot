const lang = require('../handler/lang.json');
const { react, sendImage, sendM } = require("../handler/sendFunction");


async function fun(sock, m, M, result) {
    if (result.startsWith(".dare")) {
        dare(sock, m, M);
    } else if (result.startsWith(".pickupline")) {
        pickupline(sock, m, M)
    } else if (result.startsWith(".joke")) {
        joke(sock, m, M)
    } else if (result.startsWith(".truth")) {
        truth(sock,m,M)
    }

    async function truth(sock, m, M) {
        react(sock, m, M, "🐋",);
        const pick3 = await fetch("https://shizoapi.onrender.com/api/texts/truth?apikey=shizo");
        const up3 = await pick3.json();
        sendM(sock, m, M, up3.result)
    }

    async function joke(sock, m, M) {
        react(sock, m, M, "🐋",);
        const pick2 = await fetch("https://yomamaindra.onrender.com/jokes");
        const up2 = await pick2.json();
        sendM(sock, m, M, up2.joke)
    }

    async function dare(sock, m, M) {
        react(sock, m, M, "🐋",);
        const rrrr = await fetch("https://shizoapi.onrender.com/api/texts/dare?apikey=shizo");
        const fff = await rrrr.json();
        sendM(sock, m, M, fff.result)
    }

    async function pickupline(sock, m, M) {
        react(sock, M, "💖",);
        const pick = await fetch("https://api.popcat.xyz/pickuplines");
        const up = await pick.json();
        sendImage(sock, m, M, "../src/pickupline.jpg", up.pickupline)
    }


}


module.exports = fun;