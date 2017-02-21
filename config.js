var jsonfile = require('jsonfile');
var config = require('nconf').argv()
    .env()
    .file({file: 'config.json'});

// Load Youtube API Key
config.defaults(jsonfile.readFileSync('./api-keys.json'));

module.exports = config;