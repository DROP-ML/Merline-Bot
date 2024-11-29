

const url = 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink';
const options = {
  method: 'POST',
  headers: {
    'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587', // Replace with your actual API key
    'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://www.instagram.com/reel/DCl4dTEyfxX/?igsh=dTBmZGNsYXdxYWNq' // Replace with the desired URL
  })
};

async function fetchSocialMediaData(url) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json(); // Parse response as JSON
    console.log(result.medias[0].url);
  } catch (error) {
    console.error('Error:', error.message || error);
  }
}

fetchSocialMediaData(url);
