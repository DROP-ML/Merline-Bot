//      Checked 05/25/2024


const lang = require("../handler/lang.json");
const { sendM, react } = require("../handler/sendFunction");


async function turbo_ai(sock, m, M, result) {
    react(sock, m, M, lang.react.process)
    const msg = result.slice(7);

    const res = await fetch(`https://aemt.me/turbo?text=` + msg);
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

module.exports = turbo_ai;