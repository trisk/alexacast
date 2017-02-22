var kodi_rpc = require('node-kodi');
var config = require('./config');
var fuzzy = require('fuzzy');
var _ = require('lodash');

var kodi = new kodi_rpc({
    url: config.get('kodi-server:host')
});


function playAddon(addonName) {
   return kodi.addons.getAddons()
        .then(function (addons) {
            var addonsItems = addons.addons;

            var matchedItem = _.filter(addonsItems, function (item) {
                return item.name.toLowerCase().indexOf(addonName) != -1;
            });
            return matchedItem[0];
        })
        .then(function (addon) {
            return kodi.addons.executeAddon(addon.addonid);
        })
}

function sendText(text) {
    return kodi.input.sendText({"text": text});
}
function executeMovement(movement) {
    return kodi.input.executeAction(movement);
}

function select(){
    return kodi.input.select();
}


module.exports.playAddon = playAddon;
module.exports.executeMovement = executeMovement;
module.exports.select = select;
module.exports.sendText = sendText;