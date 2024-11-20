const fetch = require('node-fetch');
const fs = require('fs'); // For file system operations
const path = require('path'); // For path operations

const url = 'https://tiktok-video-downloader-api.p.rapidapi.com/media?videoUrl=https%3A%2F%2Fwww.tiktok.com%2F%40khaby.lame%2Fvideo%2F7254764316308655387';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587',
    'x-rapidapi-host': 'tiktok-video-downloader-api.p.rapidapi.com'
  }
};

// Fetch the video URL and download it
async function fetchAndDownloadVideo() {
  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse the response as JSON
    const downloadUrl = result.downloadUrl;

    if (downloadUrl) {
      // Get the video file name from the URL or assign a default name
      const videoFileName = path.basename(downloadUrl);
      const videoFilePath = path.join(__dirname, videoFileName); // Save in the current directory

      // Fetch the video content and save it to the file
      const videoResponse = await fetch(downloadUrl);
      const videoBuffer = await videoResponse.buffer(); // Convert to buffer

      // Write the video to file system
      fs.writeFileSync(videoFilePath, videoBuffer);
      console.log(`Video saved as: ${videoFilePath}`);
    } else {
      console.log('No download URL found in the response');
    }
  } catch (error) {
    console.error('Error fetching or saving video:', error);
  }
}

// Call the function to fetch and download the video
fetchAndDownloadVideo();
