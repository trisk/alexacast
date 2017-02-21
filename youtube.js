var YouTube = require('youtube-node');
var config = require('./config');
var q = require('q');
var _ = require('lodash');
var youtubeApiKey = config.get('YOUTUBE_API_KEY');

var youTube = new YouTube();

var searchOnYoutube = q.denodeify(youTube.search);


youTube.setKey(youtubeApiKey);

function search(name) {
    return searchOnYoutube(name, 5)
        .then(function (results) {
            // Return result of first video
            // try to find a live broadcast stream
            _.filter()
            var liveItems = _.filter(results.items, {snippet: {liveBroadcastContent: 'live'}});
            var liveStreams= _.filter(liveItems, {id: {kind: 'youtube#video'}});

            if (liveStreams.length > 0) {
                // return first stream
                console.log(_.first(liveStreams).id.videoId)
                return _.first(liveStreams).id.videoId
            } else {
                throw 'No live broadcast stream found'
            }
        });
}

module.exports.searchYouTube = search;


