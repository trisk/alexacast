var _ = require('lodash');
var youtube = require('./youtube');
var twitch = require('./twitch');
var chromecast = require('./chromecast');


var handlers = {

    'PlayLiveStream': function () {

        if (_.has(this.event.request, 'intent.slots.Movie.value')) {

            var movieName = this.event.request.intent.slots.Movie.value;
            youtube.searchYouTubeLive(movieName)
                .then(function (videoId) {
                    chromecast.play(videoId);
                });
            console.log('Playing ' + movieName);
            this.emit(':tell', 'Playing on TV', 'Playing YouTube stream for ' + movieName + ' on TV');
        } else {
            this.emit(':tell', 'I did not quite get that, please provide an addon name');
        }

    },

    'PlayVideo': function () {

        if (_.has(this.event.request, 'intent.slots.Movie.value')) {

            var movieName = this.event.request.intent.slots.Movie.value;
            youtube.searchYouTube(movieName)
                .then(function (videoId) {
                    chromecast.play(videoId);
                });
            console.log('Playing ' + movieName);
            this.emit(':tell', 'Playing on TV', 'Playing YouTube stream for ' + movieName + ' on TV');
        } else {
            this.emit(':tell', 'I did not quite get that, please provide an addon name');
        }

    },

    'AMAZON.StopIntent': function () {
        chromecast.stop();
        this.emit(':tell', 'I stopped playing');
    },

    'AMAZON.PauseIntent': function () {
        chromecast.pause();
        this.emit(':tell', 'I stopped playing');
    },

    'AMAZON.ResumeIntent': function () {
        chromecast.resume();
        this.emit(':tell', 'I stopped playing');
    },

    'AMAZON.StartOverIntent': function () {
        chromecast.seek(0);
        this.emit(':tell', 'I stopped playing');
    }


};

module.exports.handlers = handlers;

