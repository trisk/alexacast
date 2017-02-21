var _ = require('lodash');
var youtube = require('./youtube');
var picaster = require('./picaster');


var handlers = {

    'PlayYoutube': function () {

        if (_.has(this.event.request, 'intent.slots.Movie.value')) {

            var movieName = this.event.request.intent.slots.Movie.value;
            youtube.searchYouTube(movieName)
                .then(function (videoId) {
                    return picaster.playYouTubeStream(videoId);
                });
            console.log('Playing ' + this.event.request.intent.slots.Movie.value);
            this.emit(':tell', 'Playing on TV', 'Playing trailer for ' + movieName + ' on TV');
        } else {
            this.emit(':tell', 'Please provide a movie name');
        }

    },

    'PlayTwitch': function () {

        if (_.has(this.event.request, 'intent.slots.Game.value')) {

            var game = this.event.request.intent.slots.Game.value;
            // Get stream from twitch
            // Send it off to the streamer
            console.log('Playing stream ' + this.event.request.intent.slots.Game.value)
            this.emit(':tell', 'Playing on TV', 'Playing stream for ' + Game + ' on TV');
        } else {
            this.emit(':tell', 'Please provide a Video game name');
        }

    },

    'AMAZON.StopIntent': function () {
        // send off a request to stop
        picaster.stop();
        this.emit(':tell', 'Stream stopped');
    }


};

module.exports.handlers = handlers;

