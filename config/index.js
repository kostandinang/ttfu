'use strict';

const Config = {
    dev: {
        HOST: 'localhost',
        PORT: 3000
    },
    prod: {
        HOST: 'prodhost',
        PORT: 8080
    }
};

module.exports = (env) => {
    return Config[env] || {};
};