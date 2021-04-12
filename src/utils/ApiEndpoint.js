const axios = require('axios').default;

const base = axios.create({
    baseURL: 'https://api.deezer.com/'
});

module.exports = base;