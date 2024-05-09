// Require the package
const QRCode = require('qrcode')
const lang = require('../handler/lang.json');
const fs = require('fs');
const { react, sendImage } = require('../handler/sendFunction');


async function qrmaker(sock,m,M,text){
// Creating the data
let data = {
    name: text,
}

// Converting the data into String format
let stringdata = JSON.stringify(data)

// Print the QR code to terminal
QRCode.toString(stringdata, { type: 'terminal' },
    function (err, QRcode) {

        if (err) return //console.log("error occurred")

    })

// Converting the data into base64 
await QRCode.toDataURL(stringdata,async function (err, code) {
    if (err) return //console.log("error occurred")

    const base64Data = code.name.replace(/^data:image\/\w+;base64,/, '');

    // Create a Buffer from the base64 data
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const imageFileName = `${randomNumber}.png`;

    // Write the buffer to the file
    fs.writeFileSync(imageFileName, imageBuffer);
    react(sock, m,M, lang.react.upload);
    await sendImage(sock,m,M,imageFileName,"° вєтα тєѕтιηg вσт °");
    react(sock, m,M, lang.react.success);
    fs.unlinkSync(imageFileName);

})

}

module.exports = qrmaker;