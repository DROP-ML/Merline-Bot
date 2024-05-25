//      Checked 05/25/2024



const request = require('request');
const { react, sendM } = require("../handler/sendFunction");

async function whois(sock, m, M, result) {
  react(sock, m, M, "🧰");
  const domain = result;
  request.get({
    url: 'https://api.api-ninjas.com/v1/whois?domain=' + domain,
    headers: {
      'X-Api-Key': 'StB5afv0CFj7X4hQQLPCNQ==aH9Y4aj03Id10sMP'
    },
  }, async function (error, response, body) {
    if (error) return console.error('Request failed:', error);
    else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    const obj = JSON.parse(body);
    await sendM(sock, m, M, `
*The Whois retrieves domain registration information*
    
*Domain Name* : ${obj.domain_name}
*Registrar* : ${obj.registrar}
*Name Server* : ${obj.name_servers}
*Email* : ${obj.emails}  
*Name* : ${obj.name}   

*Use this safely ...* `)
  });
}

module.exports = whois;