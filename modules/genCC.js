const { default: axios } = require("axios");
const { sendM, sendImage, react } = require("../handler/sendFunction");

async function cc(sock,m,M){
    react(sock, m,M, "🧰");

          const gencc = {
            method: 'GET',
            url: 'https://fake-valid-cc-data-generator.p.rapidapi.com/request/',
            params: { visa_type: 'visa' },
            headers: {
              'X-RapidAPI-Key': 'b0c2ad1c52mshef83b7efd6675e3p1f7f07jsnd4fc3b825dbe',
              'X-RapidAPI-Host': 'fake-valid-cc-data-generator.p.rapidapi.com'
            }
          };

          try {
            const response = await axios.request(gencc);
            //    console.log(response.data);
            await sendImage(sock, m,M, "./src/credit.jpg", `
**Fake CC data**
                                
**Type* :  ${response.data.type}
**Firstname* :  ${response.data.firstname}
**Lastname* : ${response.data.lastname}
**CC* : ${response.data.cc}
**Valid Date* :${response.data.valid_date}     
**CVC* :${response.data.cvc} 

`)

          } catch (error) {
            console.error(error);
            await sendM(sock, m,M, `
*Got Some Error*`)
          }

}

module.exports = cc;