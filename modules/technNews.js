const fs = require('fs').promises;
const axios = require('axios');
const { sendImage, sendM } = require('../handler/sendFunction');

async function techNews(sock,m,M){
    try {
        let news = await fetch("https://fantox001-scrappy-api.vercel.app/technews/random");
    const jsonNews = await news.json();
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const filePath = `${randomNumber}.png`;
        try {
             // Fetch the image
    const response = await axios.get(jsonNews.thumbnail, { responseType: 'arraybuffer' });

    // Write the buffer to a local file
    await fs.writeFile(filePath, Buffer.from(response.data, 'binary'));

    const newsData = `
*🧰 Tech News Of World*

**News* : ${jsonNews.news}


*Have a Good day !*
    `;


    await sendImage(sock, m,M, filePath, newsData);
        } catch (error) {
            sendM(sock,m,M,"Error While Downloading Image");
        }
   
    } catch (error) {
        sendM(sock,m,M,"Error While Getting Data.")
    }
    
}

module.exports = techNews;