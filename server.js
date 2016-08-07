const express = require('express');
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

let elements = [];

app.get('/api/forms/:id', (req, res) => {
    res.json(elements);
});

app.post('/api/forms', (req, res) => {
    elements.push(req.body.type);

    res.json(elements);
});

app.delete('/api/forms', (req, res) => {
    res.json(req.body.type);
})

app.listen(3000, () => {
    console.log('Server started.');
});