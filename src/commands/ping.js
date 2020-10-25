const Command = require('../class/Command')


module.exports = new Command({

    name: 'ping',
    triggers: ['ping'],

}, async function(message, args) {

    return 'Pong!';

});
