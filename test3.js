const fetch = require('node-fetch'); // If you're using Node.js

const HEROKU_API_TOKEN = 'e58e2356-6995-4795-9cac-e6251cb4e7f2';
const HEROKU_APP_NAME = 'merlinbot1';

const restartUrl = `https://api.heroku.com/apps/${HEROKU_APP_NAME}/dynos`;

const headers = {
    'Authorization': `Bearer ${HEROKU_API_TOKEN}`,
    'Accept': 'application/vnd.heroku+json; version=3',
    'Content-Type': 'application/json',
};

const payload = {
    command: 'restart',
    attach: false,
};

fetch(restartUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
})
