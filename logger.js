/*
Author: Bruno Mayol Giannotti

Date: 03/2019

Software: A simples nodejs logger for APIs

*/
const Promise = require('bluebird');
const moment = require('moment');
const path = require('path');

class TypeError extends Error {
    constructor(message) {
        super(message);

        this.name = "TypeError";
    }
}

/*
@action -> String -> "error", "warning" or "info" are permitted
@message -> String -> Any string describing the log
@return -> Promise -> Returns a promise with a customized console.log function
*/
class Logger {

    static get RED_COLOR() {return "\x1b[31m";}
    static get GREEN_COLOR() {return "\x1b[32m";}
    static get YELLOW_COLOR() {return "\x1b[33m";}

    static get ERROR_LEVEL() {return "error";}
    static get INFO_LEVEL() {return "info";}
    static get WARNING_LEVEL() {return "warning";}

    constructor() {
        this.dir = path.basename(__filename);
    }

    async log(message, level) {
        level = level || "info";

        if (typeof message !== "string" || typeof level !== "string") {
            throw new TypeError(`Tipo da mensagem: ${typeof message}`);
        }

        let color;
        switch(level) {
            case Logger.ERROR_LEVEL: color = Logger.RED_COLOR; break;
            case Logger.WARNING_LEVEL: color = Logger.YELLOW_COLOR; break;
            default: color = Logger.GREEN_COLOR;
        }

        await this.write(color, this.format(message));
    }

    format(message) {
        let now = moment();

        return `[SERVER:${now}]: At ${this.dir} --> ${message}`;
    }

    async write(color, data) {
        console.log(color, data);
    }
}

let instance = new Logger();

module.exports = instance;
