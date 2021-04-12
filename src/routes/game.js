const route = require('express').Router();
const GameController = require('../controllers/GameController');

route.get('/getMatch/:genreId', GameController.getMatch);
route.get('/getGenre/:genreId', GameController.getGenre);

module.exports = route;