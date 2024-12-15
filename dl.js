const axios = require('axios');
const fs = require('fs').promises; // For file system operations
const path = require('path'); // For path operations
const ffmpeg = require('fluent-ffmpeg');

const url5 = 'https://social-all-in-one.p.rapidapi.com/info?format=json&url=https://www.instagram.com/reel/DBnkgUNIz0L/';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '92099ecd2cmsh20ff35cd2120ab7p18335bjsn60b078305587',
    'x-rapidapi-host': 'social-all-in-one.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
};


// Function to get the highest resolution video URL
function getHighestResolutionVideoUrl(videoData) {
  if (!videoData.ext == 'mp4') {
    console.error("No video formats available.");
    return null;
  }


  return videoData.url;
}



// Fetch the video URL and download it
async function fetchAndDownloadVideo() {
  try {
    const response = await fetch(url5, options);
    const result = await response.json(); // Parse the response as JSON
    // console.log(result);
    const downloadUrl = result.formats[result.formats.length - 1].url;
    // console.log(downloadUrl);

    if (downloadUrl) {
      // Get the video file name from the URL or assign a default name
      // const videoFileName = path.basename(downloadUrl);/
      const videoResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
      await fs.writeFile('videoFileName.mp4', Buffer.from(videoResponse.data));

      const videoResponse2 = await axios.get(result.formats[0].url, { responseType: 'stream' });
      await fs.writeFile('videoFileName.mp3', Buffer.from(videoResponse2.data));

      const videoPath = 'videoFileName.mp4';
      const audioPath = 'videoFileName.mp3';
      const outputPath = 'output-video.mp4';
      
      await ffmpeg()
        .input(videoPath)  // Video file
        .input(audioPath)  // Audio file
        .outputOptions('-c:v copy') // Copy video codec without re-encoding
        .outputOptions('-c:a aac')  // Encode audio to AAC (or compatible codec)
        .save(outputPath)  // Output file
        .on('end', () => {
          console.log('Video and audio mixed successfully!');
        })
        .on('error', (err) => {
          console.error('Error during mixing:', err);
        });
       // Save in the current directory


      

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
