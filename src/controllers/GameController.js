const express = require('express');
const api = require('../utils/ApiEndpoint');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */

const randomProperty = obj => {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}

const getRadiosByGenreId = async id => {
    const response = await api.get('/radio/genres');
    return new Promise((resolve, reject) => {
        let radios;

        for(let radio of response.data.data) {
            if(radio.id == id) {
                radios = radio.radios;
            }
        }

        return resolve(radios);
    });
}

module.exports = {

    getMatch: async (req, res) => {

        try {
            const radios = await getRadiosByGenreId(req.params.genreId);
            if(!radios) return res.status(404).send("404");
            const randomRadio = randomProperty(radios);
    
            const track = await api.get(`/radio/${randomRadio.id}/tracks`);
            let correctTrack = randomProperty(track.data.data);
            const randomTrack1 = randomProperty(track.data.data);
            const randomTrack2 = randomProperty(track.data.data);
    
            while(!correctTrack.preview) {
                correctTrack = randomProperty(track.data.data);
            }
        
            return res.json({
                correctTrackId: correctTrack.id,
                correctTrackLink: correctTrack.link,
                correctTrackPreview: correctTrack.preview,
                tracks: {
                    [randomTrack1.id]: {
                        name: randomTrack1.title,
                        artist: randomTrack1.artist.name,
                        id: randomTrack1.id,
    
                    },
                    [randomTrack2.id]: {
                        name: randomTrack2.title,
                        artist: randomTrack2.artist.name,
                        id: randomTrack2.id,
    
                    },
                    [correctTrack.id]: {
                        name: correctTrack.title,
                        artist: correctTrack.artist.name,
                        id: correctTrack.id,
    
                    }
                }
            });
        } catch (err) {
            res.status(500).send('Ocorreu um erro interno');
            console.trace('Ocorreu um erro ao criar a partida: ' + err);
        }
        
    },
    getGenre: async (req, res) => {
        const genre = await api.get(`/genre/${req.params.genreId}`);
        
        return res.json(genre.data);
    }

}