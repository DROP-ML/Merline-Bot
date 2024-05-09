const lang = require('../handler/lang.json');
const axios = require('axios');
const installationId = 'a1i0m--kUlqn6FbVrISpUwriM8Xf_xIKYzY5aRJMQnJibLS_vscljPJIN777drtf';
const { sendM, react } = require('../handler/sendFunction');

async function caller(sock, m,M, text) {
  try {
    const ph = text.slice(8);
 
    const response = await axios.get(`https://truecaller-api.vercel.app/search?phone=${encodeURIComponent(ph)}&id=${installationId}`);
    // parse the response data
    const result = response.data;
    // format the caller data into a message
    const messageText = `
 🕵🏻‍♂️ Hello, *${M.pushName}*

-------------------------------------------
|
|  👤 Name is *${result.name}*,
|  🌍 country is *${result.countryDetails.name}*,
|
____________________________

${lang.struc.footer}
    `;
    // send the message to the same chat
    await sendM(sock,m,M,messageText)

  } catch (error) {
    // handle any errors
    console.error('Error during caller:', error.message || error);
    // send an error message to the same chat
    react(sock, m,M, "🔁");
    await sendM(sock,m,M,"Error Please try again.")
  }
}

module.exports = caller;
