'use strict';

const
	Joi = require('joi'),
	Api = require('../../lib/api'),
	Service = require('./service'),
	Model = require('./model'),
	Routes = require('../../config').Routes;

const CONFIG = {
	validate: {
		payload: {
			[Model.UserDevice.DEVICE_ID]: Joi.string().required(),
			[Model.UserDevice.USER_ID]: Joi.number().required()
		},
		failAction: Api.invalidParams
	}
};

module.exports = [
	{
		method: 'GET',
		path: Routes.USER_BY_ID,
		config: {},
		handler: Service.find
	},
	{
		method: 'POST',
		path: Routes.USER_DEVICE,
		config: CONFIG,
		handler: Service.addDevice
	}
];