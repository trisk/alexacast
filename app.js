var _ = require('lodash');
var youtube = require('./youtube');
var twitch = require('./twitch');
var picaster = require('./picaster');
var kodi = require('./kodi');


var handlers = {

    'ExecuteAddon': function () {

        if (_.has(this.event.request, 'intent.slots.Addon.value')) {

            var addonName = this.event.request.intent.slots.Addon.value;
            kodi.playAddon(addonName);
            console.log('Playing ' + this.event.request.intent.slots.Addon.value);
            this.emit(':tell', 'Playing on TV', 'Playing trailer for ' + addonName + ' on TV');
        } else {
            this.emit(':tell', 'I did not quite get that, please provide an addon name');
        }

    },

    'MovementAction': function () {

        console.log(this.event.request.intent.slots)
        if (_.has(this.event.request, 'intent.slots.ActionName.value')) {

            var movement = this.event.request.intent.slots.ActionName.value;
            // Move
            kodi.executeMovement(movement)();
            console.log('Moving ' + this.event.request.intent.slots.ActionName.value);
            this.emit(':tell', 'Done');
        } else {
            this.emit(':tell', 'Please try again');
        }

    },

    'SearchAction': function () {

        if (_.has(this.event.request, 'intent.slots.Movie.value')) {

            var movieName = this.event.request.intent.slots.Movie.value;
            // Move
            kodi.sendText(movieName);
            console.log('Moving ' + this.event.request.intent.slots.Movie.value);
            this.emit(':tell', 'Done');
        } else {
            this.emit(':tell', 'Sorry I did not catch that, try again');
        }

    },

    'AMAZON.StopIntent': function () {
        kodi.home();
        this.emit(':tell', 'I stopped playing');
    }


};

module.exports.handlers = handlers;

