const { sendM, react } = require("../handler/sendFunction");

async function trackIp(sock,m,M,result){
    react(sock, m,M, "🧰");
          const ip_addr = result.slice(4);
          request.get({
            url: 'https://api.api-ninjas.com/v1/iplookup?address=' + ip_addr,
            headers: {
              'X-Api-Key': 'StB5afv0CFj7X4hQQLPCNQ==aH9Y4aj03Id10sMP'
            },
          }, function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body);
            const obj = JSON.parse(body);
            sendM(sock, m,M, `
*IP Lookup*
              
${obj.country !== undefined ? `**country** : ${obj.country}` : ''}
${obj.city !== undefined ? `**city** : ${obj.city}` : ''}
${obj.region !== undefined ? `**region** : ${obj.region}` : ''}
${obj.zip !== undefined ? `**zip** : ${obj.zip}` : ''}
${obj.lat !== undefined ? `**lat** : ${obj.lat}` : ''}
${obj.lon !== undefined ? `**lon** : ${obj.lon}` : ''}
${obj.isp !== undefined ? `**isp** : ${obj.isp}` : ''}
              
${obj.address !== undefined && obj.address !== "Use this safely" ?
                `**address** : ${obj.address}` :
                ''}
              `)
          });
}
module.exports = trackIp;