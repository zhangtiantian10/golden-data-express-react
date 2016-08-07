const express = require('express');
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

app.get('/api/forms/:id', (req, res) => {
    res.json(['hello']);
});

app.post('/api/forms', (req, res) => {
    console.log(req.body.elements);
    res.json(req.body.elements);
});

app.listen(3000, () => {
    console.log('Server started.');
});