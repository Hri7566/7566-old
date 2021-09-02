require('dotenv').config();

const config = require('./config');
const { Bot } = require('./src/Bot');
const bot = new Bot(config);
