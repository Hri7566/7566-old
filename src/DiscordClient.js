const { Client } = require("./Client");

class DiscordClient extends Client {
    constructor (clHandler) {
        super(clHandler, 'discord');
    }
}

module.exports = {
    DiscordClient
}
