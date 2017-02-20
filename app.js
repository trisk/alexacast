var _ = require('lodash');

var handlers = {

    'PlayTrailer': function () {
        var movieName = this.event.request.intent.slots[0];

        if (_.has(this.event.request, 'intent.slots.Movie.value')){
            //searchOnYoutTube();
            console.log('Playing ' + this.event.request.intent.slots.Movie.value)
            this.emit(':tell', 'Playing on TV', 'Playing ' + movieName + ' on TV');
        } else {
            this.emit(':tell', 'Please provide a movie name');
        }

    }

};

module.exports.handlers = handlers;

