'use strict';

const _ = require('lodash');
const Routes = require('./routes');

const API_URL = '/api/v1/';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const MILLIS = Math.floor(Date.now() / 1000);

let CommonConfig = {
    APP_SECRET: process.env.APP_SECRET || 'f1e878c8-e9ad-11e6-bf0e-fe55135034f3',
    Routes: Routes(API_URL)
};

const EnvConfig = {
    dev: {
        HOST: 'localhost',
        PORT: 3000,
        LOG_PATH: 'logs/',
        FB_CLIENT_ID: '1860791764203794',
        FB_CLIENT_SECRET: '4cec0649259475b79dfe4ed66cf5103a',
        DB_STRING: 'postgres://ttfu:ttfu@localhost:5432/ttfu?ssl=false',
        TOKEN_EXPIRATION_TIME: MILLIS + (60 * 60) //1Hour
    },
    prod: {
        HOST: 'localhost',
        PORT: 8080,
        LOG_PATH: '/usr/logs/',
        FB_CLIENT_ID: '1860791764203794',
        FB_CLIENT_SECRET: '4cec0649259475b79dfe4ed66cf5103a',
        DB_STRING: '',
        API_URL: '/api/v1/',
        TOKEN_EXPIRATION_TIME: MILLIS + (24 * 60 * 60) //24Hour
    }
};

let Config = EnvConfig[NODE_ENV] || {};
_.extend(Config, CommonConfig);

module.exports = Config;