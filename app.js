var handlers = {

    'PlayTrailer': function () {
        // TODO do stuff
        cosole.log(arguments)
        this.emit(':tell', 'Playing on TV', 'Please try again');
    }

};

module.exports.handlers = handlers;

