const lang = require("../handler/lang.json");
const { sendM, react } = require("../handler/sendFunction");
const gpt_4_v2 = require("./gpt-4-v2");


async function gpt_4(sock, m, M, result) {
    react(sock, m, M, lang.react.process)
    const msg = result.slice(6);

    const res = await fetch(`https://aemt.me/gpt4?text=` + msg);
    const json = await res.json();

    if (json.error === "An error occurred") {
        gpt_4_v2(sock,m,M,result)
    } else {
        let reply = json.result;
        sendM(sock, m, M, reply)
        react(sock, m, M, "🔖");
    }
}

module.exports = gpt_4;