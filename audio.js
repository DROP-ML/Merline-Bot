const fs = require('fs');
const path = require('path');
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const axios = require('axios');
const { Console } = require('console');

async function downloadAudio(url, outputFileName) {
    try {
        let q = '128kbps';
        let v = "https://youtu.be/oAVhUAaVCVQ?si=qrYiGIVJvXfAmJ1S";
        const yt = await youtubedl(v).catch(async () => await youtubedlv2(v));
        const dl_url = await yt.audio[q].download();
        console.log(dl_url)

        const response = await axios({
            method: 'GET',
            url: dl_url,
            responseType: 'stream' // Important for streaming the download to file
        });
        console.log(response)

        // Create a write stream to save the file
        const fileStream = await fs.createWriteStream(outputFileName);

        // Pipe the response data into the file stream
        await response.data.pipe(fileStream);

        // Resolve promise when file has finished writing
        await fileStream.on('finish', () => {
            fileStream.close();
            console.log(`✅ Download completed: ${filePath}`);
        });

        // Handle error while writing to the file
        await fileStream.on('error', (err) => {
            console.error('❎ Error writing to file:', err.message);
        });

    } catch (error) {
        console.error(`❎ Error downloading the file: ${error.message}`);
    }
}

// Example usage
const url = 'https://dl155.filemate19.shop/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0lnY2N6eEJFdlNvaEVwNEFpMXUvckFNRk9JcXNBaHNHUUVKVjcrenVUT3VPRE1RZTdvNU11Q1ZpSjl0aDI4aFRPNFlzbFY4ZzZmUmZvbE9teDJEeG0ya0h6ZDlUSUtxaFhlWDhtNWhKRnlpbUcyT1RXdkZDcWxYQzk5QWpSU254UDRCMEVITVBZeEw1SjQwcjlYcm5wdzhORHFpT1F2N1ppblBXRnBBamt4cVkzdGRrb0R4TW1KY2NKaTg2c2hyYmVvRUVtZzVFWjJVYjUrS1MxRDRRd1FmYkhMbUlsYm5SUCt2bXlXQmxH';
downloadAudio(url, 'audio.mp3');
