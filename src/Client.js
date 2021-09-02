const { default: cluster } = require("cluster");
const EventEmitter = require("events");

class Client extends EventEmitter {
    constructor (clHandler, context) {
        super();
        
        clHandler.addClient(this);
        if (clHandler.clients.size() > 50) cluster.fork();
        this.context = context;
    }
}

module.exports = {
    Client
}
