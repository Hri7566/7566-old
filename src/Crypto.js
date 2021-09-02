const crypto = require('crypto');

const SALT = process.env.SALT;

class Crypto {
    static generate_IDFromIP(ip) {
        let hash = crypto.createHash('sha256');
        hash.update(SALT);
        hash.update(ip);
        return hash.digest().toString('hex').substring(0, 24);
    }

    static generateRandomID() {
        let hash = crypto.createHash('sha256');
        hash.update(Date.now());
        return hash.digest().toString('hex').substring(0, 24);
    }
}