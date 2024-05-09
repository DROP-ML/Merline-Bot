const lang = require("../handler/lang.json");
const axios = require('axios');
const { sendM } = require('../handler/sendFunction');
const apiKey = '9aa7764c4e1978a72b96a55e8f4c69c3';

async function weather(sock, m,M, text) {
  try {
    const city = text;
    // make a GET request to the weather API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    // parse the response data
    const weather = response.data;
    // format the weather data into a message
    const messageText = `
 🕵🏻‍♂️ Hello, *${M.pushName}*

-------------------------------------------
|
|  ⛈️ City in *${city}*,
|  ⛅ Weather is *${weather.main.temp} °C*,
|  😶‍🌫️ Type is a *${weather.weather[0].description}*.
|  💨 The humidity is *${weather.main.humidity}%*,
|  🤯 Wind speed is *${weather.wind.speed} m/s*.
|
____________________________

${lang.struc.footer}
    `;
    // send the message to the same chat
    await sendM(sock,m,M,messageText)
  } catch (error) {
    // handle any errors
    console.error('Error during weather:', error.message || error);
    // send an error message to the same chat
    await sendM(sock,m,M,"Error fetching weather information.")
  }
}

module.exports = weather;
