'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Alexa = require('alexa-sdk');

var handlers = require('./app').handlers;

var server = express();
server.use(bodyParser.json());

// Create POST route
server.post('/', function (req, res) {
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
server.get('/', function (req, res) {
    res.json({
        "text": "hello world"
    })


});

server.listen(3000, function () {
    console.log('TV Cast app listening on port 3000!')
})
;
