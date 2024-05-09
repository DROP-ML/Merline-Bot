
const fg = require('api-dylux');
const lang = require('../handler/lang.json');
const { sendM, react } = require('../handler/sendFunction');

async function ttinfo(sock, m, M, result) {
    const text = result.slice(8)
    if (text !== "") {
        try {
            const data8 = await fg.tiktok2(text)
            const text2 =
                `..........................................
    
🚼 *Author* : ${data8.author.name}  \n
💮 *Username* : ${data8.author.unique_id}\n
🕵🏻‍♂️ *Profile* : ${data8.author.url}\n
🧿 *PlayCount* : ${data8.stats.playCount}\n
   *Signature* : ${data8.author.signature}\n   
👍🏻 *Likes* : ${data8.stats.likeCount}\n
➡️ *Shares* : ${data8.stats.shareCount}\n  
🗯️ *Comments* : ${data8.stats.commentCount}\n 
⚪ *CoverMusic* : ${data8.music.title}\n 
   *Description* : ${data8.title}  \n

.........................................
    
  ° вєтα тєѕтιηg вσт °°`
            sendM(sock, m, M, text2);
            react(sock, m,M, "🔖");
        } catch (error) {
            react(sock, m,M ,lang.react.error)
        }
    } else {
        await sendM(sock,m,M,"*Please Provide a Tiktok Link*")
    }
}

module.exports = ttinfo;
