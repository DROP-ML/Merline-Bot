const { sendImage, react } = require("../handler/sendFunction");
const request = require('request');


async function fake(sock,m,M){
    react(sock, m,M, "🧰");
          request.get({
            url: 'https://api.api-ninjas.com/v1/randomuser',
            headers: {
              'X-Api-Key': 'StB5afv0CFj7X4hQQLPCNQ==aH9Y4aj03Id10sMP'
            },
          }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            const obj = JSON.parse(body);
            await sendImage(sock, m,M, "./src/fake.jpg", `
*Real Data In The Real World*

**Name* : ${obj.name}
**Username* : ${obj.username}
**Sex* : ${obj.sex}
**Email* : ${obj.email}
**B/D* : ${obj.birthday}
**Address* : ${obj.address}


**Use this safely ...* `)
          });
}

module.exports = fake;