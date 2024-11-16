const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
const randomNumber = Math.floor(Math.random() * 100000) + 1;
const outputFileName = `${randomNumber}.mp3`;

// Main function to download YouTube audio
async function downloadYouTubeAudio() {
  try {
    const videoUrl = "https://youtu.be/oAVhUAaVCVQ?si=qrYiGIVJvXfAmJ1S"; // Example YouTube video URL

    // Use yt-dlp to download the audio directly
    const outputPath = path.join(outputFileName);
    await youtubedl(videoUrl, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: outputPath, // Save as an MP3 file
    });

    console.log(`✅ Download completed: Saved as ${outputFileName}`);
  } catch (error) {
    console.error(`❎ Error: ${error.message}`);
  }
}

// Run the main function
downloadYouTubeAudio();
