const request = require('request');
const { react, sendM } = require("../handler/sendFunction");

async function pass(sock,m,M,result){
    react(sock, m,M, "🧰");
          const length = result.slice(6);
          request.get({
            url: 'https://api.api-ninjas.com/v1/passwordgenerator?length=' + length,
            headers: {
              'X-Api-Key': 'StB5afv0CFj7X4hQQLPCNQ==aH9Y4aj03Id10sMP'
            },
          }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            const obj = JSON.parse(body);
            await sendM(sock, m,M, `
*Your Password is * `);

            await sendM(sock, m,M, `
${obj.random_password}`)
          });
}

module.exports = pass;