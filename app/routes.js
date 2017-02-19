'use strict';

const Cfg = require('./config');
const Mods = require('./modules/');

const NO_AUTH = {
	auth: false
};

module.exports = server => {

	/**
	 * Authorization
	 */
	server.route({
		method: 'GET',
		path: Cfg.Routes.FB_AUTH,
		config: Mods.Auth.Config.FBAuth
	});

	server.route({
		method: 'GET',
		path: Cfg.Routes.FB_LOGIN,
		config: Mods.Auth.Config.FBLogin,
		handler: Mods.Auth.Service.FB_LOGIN
	});
};