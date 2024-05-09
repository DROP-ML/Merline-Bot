const { sendM } = require("../handler/sendFunction");


async function grpLinkInfo(sock,M, m, result) {
  const promote = result.split(".whatsapp.com/");
  const response = await sock.groupGetInviteInfo(promote[1]);

  const adminNumbers = response.participants
    .filter(participant => participant.admin === "admin")
    .map(participant => `\n wa.me/9${participant.id.split("@")[0].slice(1)}`);

  sendM(sock, m,M, `*Group Info Of* : ` + result.slice(9) + `\n\n*Group Owner* : wa.me/9${response.subjectOwner.split("@")[0].slice(1)}\n*Group Name* : ${response.subject}\n*Admins Are* : ${adminNumbers}\n\n*Description* : ${response.desc} \n\n\n*Beta Whatsapp Userbot*`)
}

module.exports = grpLinkInfo;