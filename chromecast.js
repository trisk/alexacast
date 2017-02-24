var Client = require('castv2-client').Client;
var Youtube = require('./youtube/castv2-youtube').Youtube;
var mdns = require('mdns');

var browser = mdns.createBrowser(mdns.tcp('googlecast'));

var player;

function playVideo(videoId){

    browser.on('serviceUp', function (service) {
        console.log('found device "%s" at %s:%d', service.name, service.addresses[0], service.port);
        ondeviceup(service.addresses[0]);
        browser.stop();
    });

    browser.start();

    function ondeviceup(host) {

        var client = new Client();
        client.connect(host, function () {
            console.log('connected, launching app ...');
            client.launch(Youtube, function (err, player) {
                console.log('Loading player....');
                // player.load('vT6mRL0AA78');
                player.load(videoId);
            });
        });

        client.on('error', function (err) {
            console.log('Error: %s', err.message);
            client.close();
        });

    }
}

module.exports.play = playVideo;
