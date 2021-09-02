const { Client } = require("./Client");

class WebSocketClient extends Client {
    constructor (clHandler) {
        super(clHandler, 'ws');
    }
}

module.exports = {
    WebSocketClient
}
