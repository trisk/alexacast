var twitch = require("twitch.tv");
var config = require('./config');
var _ = require('lodash');
var Q = require('q');

var twitchQ = Q.denodeify(twitch);


function search(gameName) {

    return twitchQ('search/streams?q=' + gameName, {
        apiVersion: '3',
        clientID: config.get('twitch:clientId')
    }).then(function (res) {
        if (res.streams.length > 0) {
            return _.first(res.streams).channel.name;
        }
    });
}

module.exports.search = search;