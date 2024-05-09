
function generateRandom4DigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);

}

const fs = require('fs').promises; // Use fs.promises for async file operations
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath);

async function compressVideo(sock, m, M, video, cap) {
    const ret = generateRandom4DigitNumber()
    const ghgj = ret + '.mp4'
    try {
        ffmpeg()
            .input(video)
            .videoCodec('libx264')
            .audioCodec('aac')
            .videoBitrate('1000k') // Adjust the video bitrate
            .audioBitrate('96k')
            .output(ghgj)
            .on('end', async () => {
                console.log('Compression finished');
                await sock.sendMessage(
                    m,
                    {
                        video: fs.readFileSync('./' + ghgj),
                        caption: cap,
                        gifPlayback: false
                    }, { quoted: M })

                await fs.unlink(video);
                await fs.unlink(ghgj);

            })
            .on('error', (err) => {
                console.error('Error:', err);
            })
            .run();
    } catch (error) {
        console.log("errorrrrrrrrrrrrrrrrrr")
    }

}


module.exports = compressVideo;
