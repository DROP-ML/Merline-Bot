const { exec } = require('child_process');

const videoPath = 'input-video.mp4';
const audioPath = 'input-audio.mp3';
const outputPath = 'output-video.mp4';

const command = `ffmpeg -i ${videoPath} -i ${audioPath} -c:v copy -c:a aac ${outputPath}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  if (stderr) {
    console.error('FFmpeg stderr:', stderr);
    return;
  }
  console.log('Video and audio mixed successfully!');
});
