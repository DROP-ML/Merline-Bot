const lang = require("../handler/lang.json");
const fs = require('fs').promises; // Use fs.promises for async file operations
const { default: axios } = require("axios");
const { sendM, react, sendImage } = require("../handler/sendFunction");


async function lyric(sock, m, M, result) {
    react(sock, m, M, lang.react.process)
    const msg = result.slice(8);
    try {
        const res = await fetch(`https://api.popcat.xyz/lyrics?song=` + msg);
        const json = await res.json();

        try {
            const randomNumber = Math.floor(Math.random() * 100000) + 1;
            const outputPath = `${randomNumber}.png`;
            react(sock, m, M, lang.react.process)

            // Make a GET request using Axios
            const response = await axios({
                method: 'get',
                url: json.image,
                responseType: 'arraybuffer',
            })
            try {
                fs.writeFileSync(outputPath, Buffer.from(response.data, 'binary'));
                await sendImage(sock, m, M, outputPath, `\n Title : ${json.title}\n Artist : ${json.artist}\n *Lyrics* :\n${json.lyrics}`)
                react(sock, m, M, lang.react.success);
                await fs.unlink(outputPath);
            } catch (error) {
                console.error('Error downloading image:', error.message);
                react(sock, m, M, lang.react.error);
            };
        } catch (error) {

        }

        react(sock, m, M, "🔖");

    } catch (error) {
        sendM(sock, m, M, "| Error While Finding Lyrics . |")
    }

}

module.exports = lyric;