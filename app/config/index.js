'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';

const Config = {
    dev: {
        HOST: 'localhost',
        PORT: 3000,
        logPath: 'logs/'
    },
    prod: {
        HOST: 'localhost',
        PORT: 8080,
        logPath: '/usr/logs/'
    }
};

module.exports = Config[NODE_ENV] || {};