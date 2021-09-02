const EventEmitter = require("events");

class ClientHandler extends EventEmitter {
    constructor () {
        super();
        
        this.clients = new Map();
    }

    addClient(cl) {
        this.clients.set(cl._id, cl);
    }
}

module.exports = {
    ClientHandler
}
