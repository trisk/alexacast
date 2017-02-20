'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Alexa = require('alexa-sdk');
var https = require('https');
var fs = require('fs');
var app = express();
var config = require('nconf').argv()
    .env()
    .file({file: 'config.json'});

// Skill handlers
var handlers = require('./app').handlers;

app.use(bodyParser.json());

app.post('/', function (req, res) {
    const context = {
        fail: function () {
            res.sendStatus(500);
        },
        succeed: function (data) {
            res.send(data);
        }
    };

    var alexa = Alexa.handler(req.body, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
});
app.get('/', function (req, res) {
    res.json({
        "text": "hello secure world"
    })
});


https.createServer({
    key: fs.readFileSync(config.get('certs:privateKey')),
    cert: fs.readFileSync(config.get('certs:certificate'))
}, app).listen(config.get('port'), function () {
    console.log('TV Cast app listening on port ' + config.get('port'));
});
