'use strict';

const
	Joi = require('joi'),
	Api = require('../../lib/api'),
	Service = require('./service'),
	Model = require('./model'),
	Routes = require('../../config').Routes;

const Config = {
	GET_MATCH: {
		validate: {
			query: {
				[Model._Params.FROM]: Joi.date().timestamp().raw(),
			},
			failAction: Api.invalidParams
		}
	},
	REMOVE_MATCH: {
		validate: {
			query: {
				[Model._Params.ID]: Joi.date().timestamp().raw(),
			},
			failAction: Api.invalidParams
		}
	},
	ADD_MATCH: {
		validate: {
			payload: {
				[Model.DUE_DATE]: Joi.date().timestamp().raw().required(),
				[Model.LOCATION]: Joi.string().required(),
				[Model.DESCRIPTION]: Joi.string().required(),
				[Model.LAT]: Joi.number(),
				[Model.LNG]: Joi.number(),
				[Model.MAX_PLAYERS]: Joi.number().required(),
				[Model.MIN_PLAYERS]: Joi.number().required(),
				[Model.Team.TEAM1_NAME]: Joi.string().required(),
				[Model.Team.TEAM2_NAME]: Joi.string().required(),
				[Model.Team.TEAM1_COLOR_HEX]: Joi.string(),
				[Model.Team.TEAM2_COLOR_HEX]: Joi.string()
			},
			failAction: Api.invalidParams
		}
	}
};

module.exports = [
	{
		method: 'GET',
		path: Routes.MATCH,
		config: Config.GET_MATCH,
		handler: Service.find
	},
	{
		method: 'GET',
		path: Routes.MATCH_BY_ID,
		config: Config.GET_MATCH,
		handler: Service.findById
	},
	{
		method: 'DELETE',
		path: Routes.MATCH_BY_ID,
		config: {},
		handler: Service.remove
	},
	{
		method: 'POST',
		path: Routes.MATCH,
		config: Config.ADD_MATCH,
		handler: Service.add
	}
];