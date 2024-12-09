const { default: axios } = require("axios");
const generateAnimImages = require("../modules/anime");
const lang = require('../handler/lang.json');
const caller = require("../modules/caller");
const { isNull } = require("../modules/catch");
const fake = require("../modules/fakeData");
const fun = require("../modules/fun_modules");
const gemini = require("../modules/gemini");
const cc = require("../modules/genCC");
const gpt = require("../modules/gpt");
const group = require("../modules/grouphandle");
const grpLinkInfo = require("../modules/grp-linkinfo");
const igdl = require("../modules/igdl");
const generateImages = require("../modules/imgGen");
const mp4 = require("../modules/mp4dl");
const pass = require("../modules/passwordGenerater");
const periodict = require("../modules/ptable");
const qrmaker = require("../modules/qrmaker");
const scrap = require("../modules/scrap");
const short = require("../modules/shortUrl");
const song = require("../modules/songDl");
const techNews = require("../modules/technNews");
const trackIp = require("../modules/trackIp");
const ttinfo = require("../modules/ttinfo");
const ttok = require("../modules/ttok");
const weather = require("../modules/weather");
const whois = require("../modules/whois");
const wiki = require("../modules/wiki");
const search = require("../modules/ytSearch");
const { sendM, react, sendImage, sendAudio } = require("./sendFunction");
const { error } = require("qrcode-terminal");
const alive = require("../modules/alive");
const fs = require('fs');
const newimagegen = require("../modules/newimagege");
const generateImageAndSend = require("../modules/imagecreate");
const thread = require("../modules/thread");
const fbdl = require("../modules/fbdl");
const single = require("../modules/single");
const gimage = require("../modules/gimage");
const anime_story = require("../modules/anime-story");
const bard = require("../modules/bard");
const bing_copilot = require("../modules/bing-copilot");
const dall_e = require("../modules/dall-e");
const fbdl_v2 = require("../modules/fbdl-v2");
const fbdl_v3 = require("../modules/fbdl-v3");
const sendGirl = require("../modules/girl-s");
const gpt_4 = require("../modules/gpt-4");
const gpt_4_v2 = require("../modules/gpt-4-v2");
const openai = require("../modules/openai");
const searchD = require("../modules/search");
const ai_t2i = require("../modules/t2image-ai");
const ttok_v2 = require("../modules/ttok-v2");
const ttok_v3 = require("../modules/ttok-v3");
const ttok_v4 = require("../modules/ttok-v4");
const turbo_ai_v2 = require("../modules/turbo-text-ai-v2");
const turbo_ai = require("../modules/turbo-text-ai");
const v1_t2i = require("../modules/v1-t2image");
const v2_t2i = require("../modules/v2-t2image");
const v3_t2i = require("../modules/v3-t2image");
const v4_t2i = require("../modules/v4-t2image");
const v5_t2i = require("../modules/v5-t2image");
const v6_t2i = require("../modules/v6-t2image");
const lyric = require("../modules/lyric");
const emoji = require("../modules/emoji");
const igdl2 = require("../modules/igdl2");

async function cmd(sock, M, m, result) {

    switch (true) {
        case result.startsWith(".grpinfo"):
            await grpLinkInfo(sock, M, m, result)
            break;
        case result.startsWith(".revoke"):      //done
        case result.startsWith(".left"):        //done
        case result.startsWith(".invite"):      //done
        case result.startsWith(".setdesc"):     //done
        case result.startsWith(".mute"):        //done
        case result.startsWith(".unmute"):      //done
        case result.startsWith(".promote"):     //done
        case result.startsWith(".demote"):      //done
        case result.startsWith(".remove"):      //done
        case result.startsWith(".add"):         //done
            const action = result.split(".")[1];
            group(sock, M, m, result);
            break;
        case result.startsWith(".gemini"):      //done
            await gemini(sock, m, M, result.split(8))
            break;
        case result.startsWith('.video'):
            // sendM(sock,m,M,"Production Video has Service Stopped!")         //done
            await mp4(sock, m, M, result);
            break;
        case result.startsWith('.gpt3'):         //done
            gpt(sock, m, M, result)
            break;
        case result.startsWith('.ig'):          //done
            igdl2(sock, m, M, result.slice(4));
            break;
        case result.startsWith("https://www.instagram.com/reel/"):  //done
            igdl(sock, m, M, result);
            break;
        case result.startsWith('.ttinfo'):      //done
            await ttinfo(sock, m, M, result);
            break;
        case result.startsWith('.song'): 
        case result.startsWith('.mp3'): 
        case result.startsWith(','): 
        // sendM(sock,m,M,"Production Song Service has Stopped!")       //done
            await isNull(result, 6 , sock, m, M).then(async ress => { await song(sock, m, M, ress, "android") }).catch(error => { console.log("error") })
            break;
        case result.startsWith('.apple'):  
        // sendM(sock,m,M,"Production Song Service has Stopped!")     //done
            await isNull(result, 7, sock, m, M).then(async ress => { await song(sock, m, M, ress, "apple"); }).catch(error => { console.log("error") })
            break;
        case result.startsWith('.tk'):          //done
            await isNull(result, 4, sock, m, M).then(async ress => { await ttok_v4(sock, m, M, ress.slice(4),result); }).catch(error => { console.log("error") })
            break;
        case result.startsWith('.truth'):       //done
        case result.startsWith('.joke'):        //done
        case result.startsWith('.pickupline'):  //done
        case result.startsWith('.dare'):        //done
            fun(sock, m, M, result);
            break;
        case result.startsWith(".yt"):          //done
            await isNull(result, 4, sock, m, M).then(ress => { search(sock, m, M, ress.slice(4), m.pushName) }).catch(error => { console.log("error") })
            break;
        case result.startsWith(".city"):        //done
            await isNull(result, 6, sock, m, M).then(async ress => { await weather(sock, m, M, ress.slice(6)); }).catch(error => { console.log("error") })
            break;
        case result.startsWith(".wiki"):        //done
            react(sock, m, M, "🐋");
            await wiki(sock, m, M, result.slice(6));
            break;
        case result.startsWith(".caller"):      //done
            react(sock, m, M, "🐋");
            await caller(sock, m, M, result);
            break;
        case result.startsWith(".fb"):          //done
            react(sock, m, M, "🐋");
            await isNull(result, 4, sock, m, M,).then(async ress => { await fbdl(sock, m, M, ress.slice(4)); }).catch(error => { console.log("error") })
            break;
        case result.startsWith(".effect"):      //done
            react(sock, m, M, "🐋");
            await sendImage(sock, m, M, lang.imageCreate.panelImage, lang.imageCreate.effectCaption2);
            break;
        case result.startsWith(".gen"):         //done
            react(sock, m, M, "🐋");
            await isNull(result, 4, sock, m, M,).then(async ress => { await generateImages(sock, m, M, ress); }).catch(error => { console.log("error") })
            break;
        case result.startsWith(".anime"):
            isNull(result, 7, sock, m, M,).then(async ress => { await generateAnimImages(sock, m, M, ress); }).catch(error => { console.log("error") })
            react(sock, m, M, "🐋");
            break;
        case result.startsWith(".news"):        //done
            react(sock, m, M, "🪩");
            techNews(sock, m, M);
            break;
        case result.startsWith(".fake"):        //done
            fake(sock, m, M);
            break;
        case result.startsWith(".ip"):
            const xc9 = isNull(result, 4, sock, m, M)
            trackIp(sock, m, M, xc9)
            break;
        case result.startsWith(".whois"):       //done
            const xc10 = await isNull(result, 7, sock, m, M)
            whois(sock, m, M, xc10.slice(7))
            break;
        case result.startsWith(".pass"):        //done
            pass(sock, m, M, result);
            break;
        case result.startsWith(".scrap"):       //Problem
            // const xc11 = await isNull(result, 7, sock, m, M)
            // scrap(sock, m, M, xc11)
            sendM(sock,m,M,"Scraping Service Has Stopped!")
            break;
        case result.startsWith(".short"):       //done
            await isNull(result, 7, sock, m, M).then(async ress => { await short(sock, m, M, ress) }).catch(error => { console.log("error") })
            break;
        case result.startsWith(".cc"):          //done
            cc(sock, m, M)
            break;
        case result.startsWith(".peri"):        //done
            await isNull(result, 6, sock, m, M).then(async ress => { await periodict(sock, m, M, ress.slice(6)) }).catch(error => { console.log("error") })
            break;
        case result.startsWith(".qr"):
            isNull(result, 6, sock, m, M).then(async ress => { await qrmaker(sock, m, M, ress) }).catch(error => { console.log("error") })
            break;
        case result.startsWith(".ping"):        //done
            react(sock, m, M, emoji());
            const startTime = Date.now();
            await axios.get('https://google.com');
            const endTime = Date.now();
            const pingTime = endTime - startTime;
            await sendM(sock, m, M, "**Pong** : " + pingTime + "ms")
            break;
        case result.startsWith(".alive"):       //done
            await alive(sock, m, M)
            break;
        case result.startsWith("https://www.facebook.com"):
            fbdl(sock, m, M, result);
            break;
        case result.startsWith(".lyrics"):
            lyric(sock, m, M, result);
            break;
        case result.startsWith('.trd'):          //done
            await thread(sock, m, M, result.slice(5))
            break;
        case result.startsWith('.single'):      //done
            await single(sock, m, M)
            break;
        case result.startsWith('.img'):         //done
            // await gimage(sock, m, M,result.slice(5))

            axios({
                method: 'get',
                url: 'https://aemt.me/gimage?query=' + result.slice(5),
                responseType: 'arraybuffer',
            })
                .then(response => {
                    const randomNumber = Math.floor(Math.random() * 10) + 1;
                    const outputPath = `${randomNumber}.png`;
                    // Determine content type
                    const contentType = response.headers['content-type'];

                    // Save the image data to the filesystem based on content type
                    if (contentType.includes('image')) {
                        fs.writeFileSync(outputPath, Buffer.from(response.data, 'binary'));
                        console.log('Image downloaded and saved successfully.');
                        sendImage(sock, m, M, outputPath, "*Google Image Downloader*")
                        fs.unlink(outputPath);
                    } else {
                        console.error('Unexpected content type:', contentType);
                    }
                })
                .catch(error => {
                    console.error('Error downloading image:', error.message);
                });
            break;
        case result.startsWith(".animestory"):
            await anime_story();
            break;
        case result.startsWith(".bard"):        //done
            await bard(sock, m, M, result)
            break;
        case result.startsWith(".bing"):        //done
            await bing_copilot(sock, m, M, result)
            break;
        case result.startsWith(".dall"):        //done
            await dall_e(sock, m, M, result.slice(6))
            // sendM(sock,m,M,"DALL-E Service Has Stopped!")
            break;
        case result.startsWith(".china"):       //
            await sendGirl(sock, m, M, 'https://aemt.me/china', 'China')
            break;
        case result.startsWith(".viet"):        //
            await sendGirl(sock, m, M, 'https://aemt.me/vietnam', 'Vietnam')
            break;
        case result.startsWith(".thai"):        //
            await sendGirl(sock, m, M, 'https://aemt.me/thailand', 'Thailand')
            break;
        case result.startsWith(".indo"):        //
            await sendGirl(sock, m, M, 'https://aemt.me/indonesia', 'Indonesia')
            break;
        case result.startsWith(".korea"):       //
            await sendGirl(sock, m, M, 'https://aemt.me/korea', 'Korea')
            break;
        case result.startsWith(".japan"):       //
            await sendGirl(sock, m, M, 'https://aemt.me/japan', 'Japan')
            break;
        case result.startsWith(".malaysia"):    //
            await sendGirl(sock, m, M, 'https://aemt.me/malaysia', 'Malaysia')
            break;
        case result.startsWith(".gpt4"):        //
            await gpt_4(sock, m, M, result)
            break;
            await gpt_4_v2(sock, m, M, result)
            break;
        case result.startsWith(".openai"):
            await openai(sock, m, M, result)
            break;
        case result.startsWith(".dict"):
            searchD(sock, m, M, result)
            break;
        case result.startsWith(".t2iai"):
            await ai_t2i(sock, m, M, result.slice(7))
            break;
        case result.startsWith(".turbo"):
            await turbo_ai(sock, m, M, result)
            break;
        case result.startsWith(".turbo2"):
            await turbo_ai_v2(sock, m, M, result)
            break;
        case result.startsWith(".t2i1"):
            await v1_t2i(sock, m, M, result.slice(6))
            break;
        case result.startsWith(".t2i2"):
            await v2_t2i(sock, m, M, result.slice(6))
            break;
        case result.startsWith(".t2i3"):
            await v3_t2i(sock, m, M, result.slice(6))
            break;
        case result.startsWith(".t2i4"):
            await v4_t2i(sock, m, M, result.slice(6))
            break;
        case result.startsWith(".t2i5"):
            await v5_t2i(sock, m, M, result.slice(6))
            break;
        case result.startsWith(".t2i6"):
            await v6_t2i(sock, m, M, result.slice(6))
            break;
        case result.startsWith('.panel'):
            await sendAudio(sock, m, M, './src/MerlinIntro.mp3')
            await sendImage(sock, m, M, './src/merlin.jpg', lang.imageCreate.panelCaption)
            break;
        case result.startsWith('.effect'):
            await sendImage(sock, m, M, './src/image.png', lang.imageCreate.effectCaption2)
            break;
            case result.startsWith('.cmd'):
                sendM(sock, m, M, `
            📜 *Merlin Command List* 📜
            
            🔹 *Group Information:*
               - \`.grpinfo\`
            
            🎥 *MP4 Downloader:*
               - \`.mp4\`
            
            🤖 *AI Commands:*
               - \`.gpt\`
               - \`.gemini\`
               - \`.bard\`
               - \`.gpt4\`
               - \`.gpt4t\`
               - \`.openai\`
               - \`.turbo\`
               - \`.turbo2\`
               - \`.bing\`
            
            📸 *Instagram Downloader:*
               - \`.ig\`
               - Paste Instagram Reel URL
            
            🎵 *Song Commands:*
               - \`.song\`
               - \`.apple\`
            
            📱 *TikTok Commands:*
               - \`.tk\`
               - \`.tk2\` (v)
               - \`.tk3\` (v)
               - \`.tk4\` (v)
               - \`.ttinfo\` (I)
            
            🎉 *Fun Commands:*
               - \`.truth\`
               - \`.joke\`
               - \`.pickupline\`
               - \`.dare\`
            
            🔍 *YouTube Search:*
               - \`.yt\`
            
            🌦️ *Weather:*
               - \`.city\`
            
            📚 *Wikipedia:*
               - \`.wiki\`
            
            📞 *Caller ID:*
               - \`.caller\`
            
            📘 *Facebook Downloader:*
               - \`.fb\`
               - \`.fb2\`
               - \`.fb3\`
               - Paste Facebook URL
            
            🎨 *Image Generation:*
               - \`.gen\`
               - \`.dall\`
               - \`.t2iai\`
               - \`.t2i1\` to \`.t2i6\`
            
            🌏 *Girls from Different Countries:*
               - \`.china\`
               - \`.viet\`
               - \`.thai\`
               - \`.indo\`
               - \`.korea\`
               - \`.japan\`
               - \`.malaysia\`
            
            🎌 *Anime Commands:*
               - \`.anime\`
               - \`.animestory\`
            
            📰 *Tech News:*
               - \`.news\`
            
            📰 *Fake News Generator:*
               - \`.fake\`
            
            📡 *IP Tracking:*
               - \`.ip\`
            
            🔍 *Whois Lookup:*
               - \`.whois\`
            
            🔑 *Password Generator:*
               - \`.pass\`
            
            🌐 *Web Scraping:*
               - \`.scrap\`
            
            🔗 *URL Shortener:*
               - \`.short\`
            
            💳 *Credit Card Info:*
               - \`.cc\`
            
            🧪 *Periodic Table:*
               - \`.peri\`
            
            📲 *QR Code Generator:*
               - \`.qr\`
            
            🏓 *Ping:*
               - \`.ping\`
            
            🔮 *Alive Check:*
               - \`.alive\`
            
            🧵 *Thread Downloader:*
               - \`.trd\`
            
            ❤️ *Single Status:*
               - \`.single\`
            
            📷 *Google Image Downloader:*
               - \`.img\`
            
            📚 *Dictionary Search:*
               - \`.dict\`
                `);
                break;
            

    }

    const commands = [
        { regex: /\.naruto\s+(.+)/, name: 'Naruto', url: 'https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html' },
        { regex: /\.cage\s+(.+)/, name: 'Cage', url: 'https://textpro.me/create-cage-text-effect-online-1110.html' },
        { regex: /\.neon\s+(.+)/, name: 'Neon', url: 'https://textpro.me/neon-light-text-effect-online-882.html' },
        { regex: /\.thunder\s+(.+)/, name: 'Thunder', url: 'https://textpro.me/create-3d-thunder-text-effects-online-1147.html' },
        { regex: /\.alien\s+(.+)/, name: 'Alien', url: 'https://textpro.me/online-3d-alien-text-effect-generator-1146.html' },
        { regex: /\.moss\s+(.+)/, name: 'Moss', url: 'https://textpro.me/create-realistic-3d-moss-text-effects-online-1145.html' },
        { regex: /\.shine\s+(.+)/, name: 'Shine Black', url: 'https://textpro.me/shiny-black-3d-text-effect-generator-1143.html' },
        { regex: /\.neon2\s+(.+)/, name: 'Neon Light', url: 'https://textpro.me/neon-light-style-3d-text-effect-online-1132.html' },
        { regex: /\.gradient\s+(.+)/, name: 'Gradient', url: 'https://textpro.me/create-gradient-neon-light-text-effect-online-1085.html' },
        { regex: /\.light\s+(.+)/, name: 'Light Glow', url: 'https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html' },
        { regex: /\.batman\s+(.+)/, name: 'Batman', url: 'https://textpro.me/make-a-batman-logo-online-free-1066.html' },
        { regex: /\.love\s+(.+)/, name: 'Love', url: 'https://textpro.me/create-neon-light-on-brick-wall-online-1062.html' },
        { regex: /\.harry\s+(.+)/, name: 'Harry', url: 'https://textpro.me/create-harry-potter-text-effect-online-1025.html' },
        { regex: /\.devil\s+(.+)/, name: 'Devil', url: 'https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html' },
        { regex: /\.ph\s+(.+)/, name: 'Porn Hub', url: 'https://textpro.me/generate-a-free-logo-in-pornhub-style-online-977.html' },
        { regex: /\.hellfire\s+(.+)/, name: 'Hellfire', url: 'https://textpro.me/create-a-free-online-hellfire-text-effect-1152.html' },
        { regex: /\.burn\s+(.+)/, name: 'Burn', url: 'https://textpro.me/online-real-burning-text-effect-generator-1151.html' },
        { regex: /\.gradient2\s+(.+)/, name: 'Gradient Shadow', url: 'https://textpro.me/create-a-gradient-text-shadow-effect-online-1141.html' },
        { regex: /\.party\s+(.+)/, name: 'Party', url: 'https://textpro.me/party-text-effect-with-the-night-event-theme-1105.html' },
        { regex: /\.christmas\s+(.+)/, name: 'Christmas', url: 'https://textpro.me/gold-and-turquoise-christmas-3d-text-style-effect-1104.html' },
        { regex: /\.cmas\s+(.+)/, name: 'Christmas Festive', url: 'https://textpro.me/create-christmas-festive-text-effects-online-1103.html' },
        { regex: /\.newyear\s+(.+)/, name: 'New Year', url: 'https://textpro.me/new-year-celebration-3d-gold-text-effect-1102.html' },
        { regex: /\.winter\s+(.+)/, name: 'Winter', url: 'https://textpro.me/create-winter-cold-snow-text-effect-online-1100.html' },
        { regex: /\.typo\s+(.+)/, name: 'Artistic Typography', url: 'https://textpro.me/create-artistic-typography-online-1086.html' },
        { regex: /\.bpink\s+(.+)/, name: 'Blackpink', url: 'https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html' },
        { regex: /\.glitch\s+(.+)/, name: 'Glitch', url: 'https://textpro.me/create-impressive-glitch-text-effects-online-1027.html' },
        { regex: /\.thunder2\s+(.+)/, name: 'Thunder 2', url: 'https://textpro.me/create-thunder-text-effect-online-881.html' },
        { regex: /\.love2\s+(.+)/, name: 'Love 2', url: 'https://textpro.me/free-advanced-glow-text-effect-873.html' },
        // Add more commands here
    ];

    const newCommands = [
        { regex: /\.dmetal\s+(.+)/, name: 'Dark Metal', url: 'https://photooxy.com/elegant-3d-neon-dark-metal-text-effect-online-free-416.html' },
        { regex: /\.shadow\s+(.+)/, name: 'Shadow in the Sky', url: 'https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html' },
        { regex: /\.cup\s+(.+)/, name: 'Write on the Cup', url: 'https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html' },
        { regex: /\.cup2\s+(.+)/, name: 'Funny Cup', url: 'https://photooxy.com/logo-and-text-effects/put-text-on-the-cup-387.html' },
        { regex: /\.coffee\s+(.+)/, name: 'Coffee Cup', url: 'https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html' },
        { regex: /\.love3\s+(.+)/, name: 'Love Message', url: 'https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html' },
        { regex: /\.woodlove\s+(.+)/, name: 'Wooden Boards', url: 'https://photooxy.com/logo-and-text-effects/writing-on-wooden-boards-368.html' },
        { regex: /\.rose\s+(.+)/, name: 'Golden Roses Background', url: 'https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html' },
        { regex: /\.leaves\s+(.+)/, name: 'Typography with Leaves', url: 'https://photooxy.com/logo-and-text-effects/create-a-layered-leaves-typography-text-effect-354.html' },
        { regex: /\.glow\s+(.+)/, name: 'Glowing Neon', url: 'https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html' },
        { regex: /\.rainbow\s+(.+)/, name: 'Glow Rainbow', url: 'https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html' },
        { regex: /\.sky\s+(.+)/, name: 'Stars on Night Sky', url: 'https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html' },
        { regex: /\.flame\s+(.+)/, name: 'Realistic Flaming Text', url: 'https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html' },
        { regex: /\.butterfly\s+(.+)/, name: 'Butterfly with Reflection', url: 'https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html' },
        { regex: /\.harry2\s+(.+)/, name: 'Harry Potter on Horror Background', url: 'https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html' },
        { regex: /\.coffee2\s+(.+)/, name: 'Text on Coffee Cup', url: 'https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html' },
        { regex: /\.cemetery\s+(.+)/, name: 'Text on Scary Cemetery Gate', url: 'https://photooxy.com/logo-and-text-effects/text-on-scary-cemetery-gate-172.html' },
        { regex: /\.candy\s+(.+)/, name: 'Sweet Candy', url: 'https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html' },
        { regex: /\.royal\s+(.+)/, name: 'Bevel Text with Royal Patterns', url: 'https://photooxy.com/logo-and-text-effects/bevel-text-between-royal-patterns-166.html' },
        { regex: /\.dragon\s+(.+)/, name: 'Dark Metal with Special Logo', url: 'https://photooxy.com/other-design/create-dark-metal-text-with-special-logo-160.html' },
    ];



    for (const command of commands) {
        const match = result.match(command.regex);
        if (match) {
            const textAfterCommand = match[1];
            await generateImageAndSend(sock, command.url, textAfterCommand, m, M);
            break; // Stop searching after the first match
        }
    }

    for (const command2 of newCommands) {
        const match = result.match(command2.regex);
        if (match) {
            const textAfterCommand = match[1];
            await newimagegen(sock, command2.url, textAfterCommand, m, M);
            break; // Stop searching after the first match
        }
    }
}
module.exports = cmd;