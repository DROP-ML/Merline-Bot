const lang = require('../handler/lang.json');
const axios = require('axios');
const cheerio = require('cheerio');
const { sendM } = require('../handler/sendFunction');

async function wikipediaSearch(text1) {
    try {
        const link = await axios.get(`https://en.wikipedia.org/wiki/${text1}`);
        const $ = cheerio.load(link.data);

        const title = $('#firstHeading').text().trim();
        const content = $('#mw-content-text > div.mw-parser-output').find('p').text().trim();

        return {
            title,
            content,
        };
    } catch (error) {
        console.error('Error during Wikipedia search:', error.message || error);
        throw new Error('No results found');
    }
}

async function wiki(sock, m,M, search) {
  const searchTerm = search;
  // //console.log(searchTerm);
  // //console.log("weg");
  try {
      const result = await wikipediaSearch(searchTerm);
      // //console.log(`Title: ${result.title}`);
      // //console.log(`Content: ${result.content}`);

      const messageText = `
🕵🏻‍♂️ Hello, 
     
     -------------------------------------------
     |
     |   Title is *${result.title} ,
     |   Content is  *${result.content}*.
     |
     ____________________________
     
         `;
         // send the message to the same chat
         await sendM(sock,m,M,messageText)

  } catch (error) {
      console.error(`Error: ${error.message}`);
      await sendM(sock,m,M,error.message)
  }
}

module.exports = wiki;
