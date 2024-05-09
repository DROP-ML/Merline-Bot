const lang = require("../handler/lang.json");
const { sendM, react } = require("../handler/sendFunction");


async function bard(sock, m, M, result) {
    react(sock, m, M, lang.react.process)
    const msg = result.slice(6);

    try {
        const res = await fetch(`https://aemt.me/bard?text=` + msg);
        const json = await res.json();

        let reply = json.result;
        sendM(sock, m, M, reply)
        react(sock, m, M, "🔖");

    } catch (error) {

        sendM(sock, m, M, lang.gpt.unvailable)
        react(sock, m, M, lang.react.error)



    }


}

module.exports = bard;