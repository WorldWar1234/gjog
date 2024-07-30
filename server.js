const express = require('express');
const authenticate = require('./src/authenticate');
const params = require('./src/params');
const compress = require('./src/compress');

const app = express();

app.enable('trust proxy');
app.get('/', authenticate, params, (req, res) => {
  const imageUrl = req.params.url;
  compress(req, res, imageUrl);
});
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.listen(process.env.PORT || 8080, () => console.log('Listening...'));
