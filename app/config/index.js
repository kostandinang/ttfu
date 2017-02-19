'use strict';

require('dotenv').config();
const _ = require('lodash');
const Routes = require('./routes');
const Errors = require('./errors');

const API_URL = '/api/v1/';
const MILLIS = Math.floor(Date.now() / 1000);

const CONFIG_KEYS = [
	'HOST',
	'PORT',
	'APP_SECRET',
	'DB_STRING',
	'FB_CLIENT_ID',
	'FB_CLIENT_SECRET',
	'LOG_PATH',
];

let CommonConfig = {
	Routes: Routes(API_URL),
	Errors: Errors
};

CONFIG_KEYS.forEach(key => {
	CommonConfig[key] = process.env[key];
});

const EnvConfig = {
	development: {
		TOKEN_EXPIRATION_TIME: MILLIS + (60 * 60) //1Hour
	},
	production: {
		TOKEN_EXPIRATION_TIME: MILLIS + (24 * 60 * 60) //24Hour
	}
};

let Config = EnvConfig[process.env.ENVIRONMENT] || {};
_.extend(Config, CommonConfig);

module.exports = Config;