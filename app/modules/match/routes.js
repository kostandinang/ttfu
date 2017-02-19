'use strict';

const
	Joi = require('joi'),
	Api = require('../../lib/api'),
	Service = require('./service'),
	Model = require('./model'),
	Routes = require('../../config').Routes;

const CONFIG = {
	validate: {
		query: {
			[Model._Params.FROM]: Joi.date().timestamp().raw(),
		},
		failAction: Api.invalidParams
	}
};

module.exports = [
	{
		method: 'GET',
		path: Routes.MATCH,
		config: CONFIG,
		handler: Service.find
	},
	{
		method: 'GET',
		path: Routes.MATCH_BY_ID,
		config: CONFIG,
		handler: Service.findById
	},
	{
		method: 'DELETE',
		path: Routes.MATCH_BY_ID,
		config: CONFIG,
		handler: Service.remove
	}
];