'use strict';

const Joi = require('joi');
const Api = require('../../lib/api');
const Service = require('./service');
const Model = require('./model');
const Aux = require('./auxs');

const Config = {
	validate: {
		payload: {
			[Model.UserDevice.DEVICE_ID]: Joi.string().required(),
			[Model.UserDevice.USER_ID]: Joi.number().required()
		},
		failAction: Api.invalidParams
	}
};

module.exports = {
	Config: Config,
	Service: Service,
	Model: Model,
	Aux: Aux
};