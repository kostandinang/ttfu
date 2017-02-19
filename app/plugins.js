'use strict';

const Path = require('path');

const BLIPP_OPTIONS = {
	showAuth: true
};

const GOOD_OPTIONS = {
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
};

module.exports = [
	{
		plugin: {
			register: 'inert',
			options: {}
		}

	},
	{
		plugin: {
			register: 'bell',
			options: {}
		}
	},
	{
		plugin: {
			register: 'hapi-auth-jwt2',
			options: {}
		}
	},
	{
		plugin: {
			register: 'blipp',
			options: BLIPP_OPTIONS
		}
	},
	{
		plugin: {
			register: 'good',
			options: GOOD_OPTIONS
		}
	},
	{
		plugin: {
			register: Path.join(__dirname, 'modules/auth/plugin'),
			options: {}
		}
	},
	{
		plugin: {
			register: 'hapi-router',
			options: {
				routes: './app/modules/**/routes.js'
			}
		}
	}
];