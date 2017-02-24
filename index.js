'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Alexa = require('alexa-sdk');
var https = require('https');
var fs = require('fs');
var app = express();
var ngrok = require('ngrok');
var config = require('./config');
var _ = require('lodash');

// Skill handlers
var handlers = require('./app').handlers;

app.use(bodyParser.json());

app.post('/', function (req, res) {
    var context = {
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

    // If ngrok has been configured set it up
    var ngrokConfig = config.get('ngrok');
    if (ngrokConfig) {
        console.log('Setting up ngrok');
        ngrok.connect(ngrokConfig, function(err, path){
            if (err){
                console.log('Unable to setup ngrok due to: ' + JSON.stringify(err));
                process.exit(1);
            } else {
                console.log('TV Cast app available ' + path);
            }
        });

        process.on('exit', function(){
            ngrok.kill();
        });
        process.on('SIGHUP', function(){
            ngrok.kill();
        });

    }

});
