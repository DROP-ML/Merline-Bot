const lang = require("../handler/lang.json");
const { sendM, react } = require("../handler/sendFunction");


async function gpt(sock, m, M, result) {

    const msg = result.slice(6);

    const res = await fetch(`https://ultimetron.guruapi.tech/gpt2?prompt=` + msg);
    const json = await res.json();

    if (json.error === "An error occurred") {
        const res2 = await fetch(`https://ultimetron.guruapi.tech/gpt3?prompt=` + msg);
        const json2 = await res2.json();

        if (json2.error === "An error occurred") {
            const res3 = await fetch(`https://ultimetron.guruapi.tech/gita?prompt=` + msg);
            const json3 = await res3.json();

            if (json3.error === "An error occurred") {
                sendM(sock,m,M,lang.gpt.unvailable)
            } else {
                let reply3 = json3.completion;
                sendM(sock,m,M,reply3)
                react(sock,m,M,"🔖" );
            }
        } else {
            let reply2 = json2.completion;
            sendM(sock,m,M,reply2)
            react(sock,m,M,"🔖" );
        }
    } else {
        let reply = json.completion;
        sendM(sock,m,M,reply)
        react(sock,m,M,"🔖" );
    }
}

module.exports = gpt;