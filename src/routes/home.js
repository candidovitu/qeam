const route = require('express').Router();
const HomeController = require('../controllers/HomeController');

route.get('/', (req, res) => {
    res.render('index.html');
});

route.get('/genreList', HomeController.getGenreList);

module.exports = route;