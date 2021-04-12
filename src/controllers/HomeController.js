const express = require('express');
const api = require('../utils/ApiEndpoint');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
*/

module.exports = {

    getGenreList: async (req, res) => {
        const genres = await api.get('/genre');
        return res.json(genres.data);
    }

}