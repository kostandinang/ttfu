'use strict';

const Joi = require('joi');
const Service = require('./service');
const Api = require('../../lib/api');
const Model = require('./model');

const Config = {
	validate: {
		query: {
			[Model._Params.FROM]: Joi.date().timestamp().raw(),
		},
		failAction: Api.invalidParams
	}
};

module.exports = {
	Config: Config,
	Service: Service,
	Model: Model
};