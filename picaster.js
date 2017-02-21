var _ = require('lodash');
var needle = require('needle');
var Q = require('q');
var config = require('./config')


var picastUrl = "http://" + config.get('picast:host') + ":" + config.get("port");

var needleGetQ = Q.denodeify(needle.get);


function playYouTubeStream(streamName) {
    return needleGetQ(picastUrl + '/yt-stream/' + streamName)
        .then(function (response) {
            if (response.statusCode !== 200) {
                throw 'Unable to play stream';
            }
        });
}
function stopStream() {
    return needleGetQ(picastUrl + '/stop')
        .then(function (response) {
            if (response.statusCode !== 200) {
                throw 'Unable to stop stream';
            }
        });
}

module.exports.stop = stopStream;
module.exports.playYouTubeStream = playYouTubeStream;