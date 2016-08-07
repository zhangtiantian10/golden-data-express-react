const express = require('express');
const app = new express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

app.get('/api/forms/:id', (req, res) => {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            next(err);
            return;
        }

        if (data === '') {
            res.status(200).json([]);

        }
        else {
            var newData = JSON.parse(data);

            res.status(200).json(newData);
        }
    });
});

app.post('/api/forms', (req, res) => {

    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            return;
        }
        let newData = [];

        if (data != '') {
            newData = JSON.parse(data);
        }
        newData.push(req.body.type);

        fs.writeFile('./data.json', JSON.stringify(newData), function (err) {

            return;
        });
        res.status(200).json(newData);
    });
})

app.delete('/api/forms', (req,res) => {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            return;
        }
        let newData = [];

        if (data != '') {
            newData = JSON.parse(data);
        }
        newData.splice(req.body.index, 1);

        fs.writeFile('./data.json', JSON.stringify(newData), function (err) {

            return;
        });
        res.status(200).json(newData);
    });
});

app.listen(3000, () => {
    console.log('Server started.');
});