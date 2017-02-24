// var airplayer = require('airplayer')
//
// var list = airplayer()
//
// list.on('update', function (player) {
//     console.log('Found new AirPlay device:', player.name)
//     player.play("")
// })


var browser = require( 'airplay-xbmc' ).createBrowser();
browser.on( 'deviceOn', function( device ) {
    device.play( 'https://www.youtube.com/watch?v=PYq07kvf3Uk', 0, function() {
        console.info( 'video playing...' );
    });
});
browser.start();