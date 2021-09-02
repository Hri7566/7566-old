const EventEmitter = require("events");
const WebSocket = require("ws");
const { ClientHandler } = require("./ClientHandler")
const http = require('http');
const https = require('https');
const { Logger } = require("./Logger");
const chalk = require("chalk");
const { readFile } = require("fs");
const { join } = require("path");

class Bot extends EventEmitter {
    constructor (config) {
        super();

        this.logger = new Logger('Bot', chalk.blue);
        this.bindEventListeners();
        
        this.clientHandler = new ClientHandler();

        if (!config) return;

        for (let i of config.enabled) {
            this.emit('enable', i);
        }

        this.logger.log('Started');
    }

    bindEventListeners() {
        this.on('enable', clType => {
            switch (clType.toLowerCase()) {
                case 'websocket':
                    this.startWebSocketServer();
                    break;
            }
        });
    }

    async startWebSocketServer() {
        this.wss = new WebSocket.Server({
            noServer: true
        });

        let handleUpgrade = (req, socket, head) => {
            this.wss.handleUpgrade(req, socket, head, (ws, req) => {
                this.emit('upgradeHandled', ws, req);
            });
        }

        this.httpsServer = https.createServer({
            // TODO add certificates
        });

        this.httpServer = http.createServer();

        this.httpsServer.listen(3000);
        this.httpServer.listen(3001);

        this.httpServer.on('request', (req, res) => {
            let path = req.url;
            if (path == '/') path = '/index.html'
            readFile(join(process.cwd(), 'public', path), (err, data) => {
                if (err) return this.logger.error(err);
                res.write(data);
                res.end();
            });
        });

        this.httpsServer.on('upgrade', (req, socket, head) => {
            handleUpgrade(req, socket, head);
        });

        this.httpServer.on('upgrade', (req, socket, head) => {
            handleUpgrade(req, socket, head);
        });

        this.wss.on('connection', (ws, req) => {
            ws.on('message', data => {
                console.log(data.toString());
            });
        });
    }
}

module.exports = {
    Bot
}
