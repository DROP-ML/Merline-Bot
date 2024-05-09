const lang = require("../handler/lang.json");
const { sendM, react } = require("../handler/sendFunction");


async function searchD(sock, m, M, result) {
    react(sock, m, M, lang.react.process)
    const msg = result.slice(6);

    const res = await fetch(`https://aemt.me/blackbox?text=` + msg);
    const json = await res.json();

    if (json.error === "An error occurred") {
        sendM(sock, m, M, lang.gpt.unvailable)
        react(sock, m, M, lang.react.error)
    } else {
        let reply = json.result;
        sendM(sock, m, M, reply)
        react(sock, m, M, "🔖");
    }
}

module.exports = searchD;