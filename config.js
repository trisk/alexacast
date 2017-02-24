var jsonfile = require('jsonfile');
var fs = require('fs');
var config = require('nconf').argv()
    .env()
    .file({file: 'config.json'});


if (!fs.existsSync('./api-keys.json')){
    console.log('No api-keys.json found, please see use api-keys.json.sample as a template');
    process.exit(1);
}
// Load Youtube API Key
config.defaults(jsonfile.readFileSync('./api-keys.json'));

module.exports = config;