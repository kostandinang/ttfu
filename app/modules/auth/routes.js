'use strict';

const
	Api = require('../../lib/api'),
	Joi = require('joi'),
	Service = require('./service'),
	Model = require('./model'),
	Routes = require('../../config').Routes;

const Configs = {
	FBAuthCfg: {
		auth: {
			strategy: 'facebook',
			mode: 'try'
		},
		handler: Service.fbAuth
	},
	FBLoginCfg: {
		auth: false,
		validate: {
			query: {
				[Model._Params.FB_TOKEN]: Joi.string().required(),
			},
			failAction: Api.invalidParams,
		},
		handler: Service.fbLogin
	}
};

module.exports = [
	{
		method: 'GET',
		path: Routes.FB_AUTH,
		config: Configs.FBAuthCfg
	},
	{
		method: 'GET',
		path: Routes.FB_LOGIN,
		config: Configs.FBLoginCfg
	}
];