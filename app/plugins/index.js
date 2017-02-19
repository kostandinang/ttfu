'use strict';

const Promise = require('bluebird');
const Inert = require('inert');
const Good = require('good');
const Bell = require('bell');
const Log = require('../lib/log');
const Jwt = require('hapi-auth-jwt2');
const Blipp = require('blipp');

const BlippPlug = {
	register: Blipp,
	options: {
		showAuth: true
	}
};

const GoodPlug = {
	register: Good,
	options: {
		reporters: {
			console: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{
					response: '*',
					log: '*'
				}]
			}, {
				module: 'good-console'
			}, 'stdout']
		}
	}
};

let plugins = (server) => {
	let $ = Promise.pending();
	const registrations = [
		Inert,
		Bell,
		Jwt,
		BlippPlug,
		GoodPlug
	];

	server.register(registrations, (err) => {
		if (err) {
			Log.error(err.message, err);
			$.reject();
		}
		$.resolve();
	});

	return $.promise;
};

module.exports = plugins;