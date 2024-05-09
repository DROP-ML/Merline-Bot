const { sendM } = require("../handler/sendFunction");

function cv(text){
    var dd = text.split("|")
    var a = dd[0];
    var b = dd[1];
    return {a,b};
    };

async function isNull(text,value,sock,m,M){
    const audioName = text.slice(value)
    if (audioName !== "") {
        return text;
      } else {
        await sendM(sock,m,M,"*Please Enter Values*")
        return null
      }
}
    module.exports = {cv,isNull};