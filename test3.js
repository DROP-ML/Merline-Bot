// Import the fbdl function from the ruhend-scraper package
const { fbdl } = require('ruhend-scraper');

// Define the Facebook URL (replace with the actual URL)
const text = "https://www.facebook.com/100087191392162/videos/757175486407326/?mibextid=rS40aB7S9Ucbxw6v";  // Example link

// Wrap in an async function since we are using await
async function downloadVideo() {
    try {
        // Fetch the video data from the fbdl function
        let res = await fbdl(text);

        // Extract the data
        let data = await res.data;

        // Log the data
        console.log(data);  // Logs the extracted video data
    } catch (error) {
        // Catch and log any errors
        console.error('Error fetching the video:', error);
    }
}

// Call the async function
downloadVideo();
