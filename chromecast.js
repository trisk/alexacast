var Client = require('castv2-client').Client;
var Youtube = require('youtube-castv2-client').Youtube;
var mdns = require('mdns');

var browser = mdns.createBrowser(mdns.tcp('googlecast'));

var discoveredPlayer;

function playVideo(videoId) {

    if (!discoveredPlayer) {

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
                    discoveredPlayer = player;
                    player.load(videoId, function (err) {
                        if (err) {
                            console.log('Failed to play due to: ' + JSON.stringify(err));
                        }
                    });
                });
            });

            client.on('error', function (err) {
                console.log('Error: %s', err.message);
                client.close();
            });

        }
    } else {
        discoveredPlayer.load(videoId, function (err) {
            if (err) {
                console.log('Failed to play due to: ' + JSON.stringify(err));
            }
        });    }

}
function stopVideo() {
    if (discoveredPlayer) {
        discoveredPlayer.stop();
    }
}

function pauseVideo() {
    if (discoveredPlayer) {
        discoveredPlayer.pause();
    }
}

function resumeVideo() {
    if (discoveredPlayer) {
        discoveredPlayer.play();
    }
}

function seek() {
    if (discoveredPlayer) {
        discoveredPlayer.seek(0);
    }
}

module.exports.play = playVideo;
module.exports.stop = stopVideo;
module.exports.pause = pauseVideo;
module.exports.resume = resumeVideo;
module.exports.seek = seek;
