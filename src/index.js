const express = require('express');
const app = express();

const routes = require('./routes');

app.set('views', 'frontend/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false }));

app.use('/public', express.static('frontend/public'));

app.use('/', routes.main);
app.use('/game', routes.game);

app.listen(3000, () => {
    console.log('Listening at 3000!');
});