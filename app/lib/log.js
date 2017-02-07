'use strict';

const Winston = require('winston');
const Cfg = require('../config');

const logger = new Winston.Logger({
    transports: [
        new (Winston.transports.Console)(),
        new (Winston.transports.File)({
            name: "info-file",
            filename: Cfg.LOG_PATH + "info.log",
            level: 'info'
        }),
        new (Winston.transports.File)({
            name: "warn-file",
            filename: Cfg.LOG_PATH + "warn.log",
            level: 'warn'
        }),
        new (Winston.transports.File)({
            name: "error-file",
            filename: Cfg.LOG_PATH + "error.log",
            level: 'error'
        })
    ]
});

module.exports = {
    info: (message, metadata) => {
        logger.log('info', message, metadata);
    },
    warn: (message, metadata) => {
        logger.log('warn', message, metadata);
    },
    error: (message, metadata) => {
        logger.log('error', message, metadata);
    }
};