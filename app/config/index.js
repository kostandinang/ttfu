'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';

const Config = {
    dev: {
        HOST: 'localhost',
        PORT: 3000,
        LOG_PATH: 'logs/',
        FB_CLIENT_ID: '1860791764203794',
        FB_CLIENT_SECRET: '4cec0649259475b79dfe4ed66cf5103a',
        DB_STRING: 'postgres://ttfu:ttfu@localhost:5432/ttfu?ssl=false',
        API_URL: '/api/v1/'
    },
    prod: {
        HOST: 'localhost',
        PORT: 8080,
        LOG_PATH: '/usr/logs/',
        FB_CLIENT_ID: '1860791764203794',
        FB_CLIENT_SECRET: '4cec0649259475b79dfe4ed66cf5103a',
        DB_STRING: '',
        API_URL: '/api/v1/'
    }
};

module.exports = Config[NODE_ENV] || {};