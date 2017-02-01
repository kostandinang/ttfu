'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';

const Config = {
    dev: {
        HOST: 'localhost',
        PORT: 3000,
        logPath: 'logs/',
        FBClientId: '1860791764203794',
        FBClientSecret: '4cec0649259475b79dfe4ed66cf5103a',
        DBString: 'postgres://ttfu:ttfu@localhost:5432/ttfu?ssl=false'
    },
    prod: {
        HOST: 'localhost',
        PORT: 8080,
        logPath: '/usr/logs/',
        FBClientId: '1860791764203794',
        FBClientSecret: '4cec0649259475b79dfe4ed66cf5103a',
        DBString: ''
    }
};

module.exports = Config[NODE_ENV] || {};