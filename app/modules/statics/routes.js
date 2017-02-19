'use strict';

const
	Service   = require('./service'),
	Routes    = require('../../config').Routes;

const CONFIG = {
	auth: false
};

module.exports = [
	{
		method: 'GET',
		path: Routes.ROOT,
		config: CONFIG,
		handler: Service.default
	},
	{
		method: 'GET',
		path: Routes.NOT_FOUND,
		config: CONFIG,
		handler: Service.error404
	}
];