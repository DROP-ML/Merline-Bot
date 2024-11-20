const fetch = require('node-fetch');

const url = 'https://tiktok-video-downloader-api.p.rapidapi.com/media?videoUrl=https%3A%2F%2Fwww.tiktok.com%2F%40khaby.lame%2Fvideo%2F7254764316308655387';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587',
    'x-rapidapi-host': 'tiktok-video-downloader-api.p.rapidapi.com'
  }
};

async function fetchAndLogResponse() {
  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse the response as JSON
    console.log(result.downloadUrl); // Log the JSON result
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
  }
}

fetchAndLogResponse();
