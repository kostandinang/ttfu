'use strict';

const
	Config = require('../../config'),
	Jwt = require('../../lib/jwt');

const registerAuth = server => {
	server.auth.strategy('facebook', 'bell', {
		provider: 'facebook',
		password: 'cookie_encryption_password_secure',
		isSecure: false,
		clientId: Config.FB_CLIENT_ID,
		clientSecret: Config.FB_CLIENT_SECRET,
		location: server.info.uri
	});
	server.auth.strategy('jwt', 'jwt', {
		key: Config.APP_SECRET,
		validateFunc: Jwt.verify,
		verifyOptions: {algorithms: ['HS256']},
		tokenType: 'Bearer'
	});
	server.auth.default('jwt');
};

exports.register = (server, options, next) => {
	registerAuth(server);
	next();
};

exports.register.attributes = {
	name: 'Auth',
	version: '1.0.0'
};