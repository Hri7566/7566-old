const chalk = require("chalk");

const DEBUG = process.env.DEBUG;

class Logger {
    constructor (id, color) {
        this.id = id;
        typeof color === 'function' ? this.color = color : chalk.green;
    }

    log(...args) {
        console.log(chalk.bgBlue(chalk.white(`INFO`)), this.color(this.id), ...args);
    }

    error(...args) {
        console.error(chalk.bgRed(chalk.white(`ERROR`)), this.color(this.id), ...args);
    }

    warn(...args) {
        console.warn(chalk.bgYellow(chalk.white(`WARNING`)), this.color(this.id), ...args);
    }

    debug(...args) {
        if (DEBUG == 'true') {
            console.debug(chalk.bgCyan(chalk.white(`DEBUG`)), this.color(this.id), ...args);
        }
    }
}

module.exports = {
    Logger
}
