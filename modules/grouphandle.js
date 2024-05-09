const lang = require("../handler/lang.json");
const { sendM, react } = require("../handler/sendFunction");

async function group(sock, M,m, result) {
    if (M.key.participant === lang.adminList.owner) {
        if (result.startsWith(".invite")) {
            await handleInvite(sock, m,M);
        } else if (result.startsWith(".setdesc")) {
            await handleSetDescription(sock, m,M, result);
        } else if (result.startsWith(".mute")) {
            await handleMute(sock, m,M);
        } else if (result.startsWith(".unmute")) {
            await handleUnmute(sock, m,M);
        } else if (result.startsWith(".promote")) {
            const promote = result.slice(9);
            await makepromote(sock, m,M, promote);
        } else if (result.startsWith(".demote")) {
            const promote = result.slice(8);
            await makedemote(sock, m,M, promote);
        } else if (result.startsWith(".remove")) {
            const promote = result.slice(8);
            await userremove(sock, m,M, promote);
        } else if (result.startsWith(".add")) {
            const promote = result.slice(5);
            await useradd(sock, m,M, promote);
        } else if (result.startsWith(".left")) {
            sendM(sock,m,M,lang.group.leave)
            await sock.groupLeave(m);
        } else if (result.startsWith(".revoke")) {
            const code = await sock.groupRevokeInvite(m)
            sendM(sock,m,M,lang.group.revoke)
        }
    } else {
        sendM(sock, m,M, lang.ownerAbility.notOwner);
    }
}

async function handleInvite(sock, m,M) {
    var code = await sock.groupInviteCode(m);
    code =
        `*Follow this link to join my Whatsapp group:*
    
https://chat.whatsapp.com/`+ code + `

*Beta Whatsapp Userbot*`;

    sendM(sock, m,M, code);
    react(sock, m,M, lang.react.success);
}

async function handleSetDescription(sock, m,M, result) {
    const cc2 = result.slice(9);
    await sock.groupUpdateDescription(m, cc2);
    react(sock, m,M, lang.react.success);
}

async function handleMute(sock, m,M) {
    await sock.groupSettingUpdate(m, 'announcement');
    await sendM(sock, m,M, lang.group.muted);
    await react(sock, m,M, lang.react.success);
}

async function handleUnmute(sock, m,M) {
    await sock.groupSettingUpdate(m, 'not_announcement');
    await sendM(sock, m,M, lang.group.unmute);
    await react(sock, m,M, lang.react.success);
}

async function updateGroupParticipants(sock, m,M, result, action) {
    const editedResult = result + "@s.whatsapp.net";

    const response = await sock.groupParticipantsUpdate(
        m,
        [editedResult],
        action
    );

    sendM(sock, M, lang.group.action);
    react(sock, M, lang.react.success);
}

async function makepromote(sock, m,M, result) {
    await updateGroupParticipants(sock, m,M, result, "promote");
}

async function makedemote(sock, m,M, result) {
    await updateGroupParticipants(sock, m,M, result, "demote");
}

async function userremove(sock, m,M, result) {
    await updateGroupParticipants(sock, m,M, result, "remove");
}

async function useradd(sock, m,M, result) {
    await updateGroupParticipants(sock, m,M, result, "add");
}


module.exports = group;
