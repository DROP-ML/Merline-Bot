const { react, sendM } = require("../handler/sendFunction");
const request = require('request');

async function short(sock,m,M,result){
    react(sock, m,M, "🧰");
          const short = result.slice(7);
          request.get({
            url: 'https://link.inovaniar.com/api.php?url=' + short,
            headers: {
              'X-Api-Key': 'StB5afv0CFj7X4hQQLPCNQ==aH9Y4aj03Id10sMP'
            },
          }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            //const obj = JSON.parse(body);

            await sendM(sock, m,M, `
*Link Shorter powered by inovaniar.com*
        
**Shorted Link* : ${body}
        
        `)
          });
}

module.exports = short;