'use strict';

const
	Joi = require('joi'),
	Api = require('../../lib/api'),
	Service = require('./service'),
	Model = require('./model'),
	Routes = require('../../config').Routes;

const ApiConfig = {
	USER_DEVICE: {
		validate: {
			payload: {
				[Model.UserDevice.DEVICE_ID]: Joi.string().required(),
				[Model.UserDevice.USER_ID]: Joi.number().required()
			},
			failAction: Api.invalidParams
		}
	}
};

module.exports = [
	{
		method: 'GET',
		path: Routes.USER,
		config: {},
		handler: Service.find
	},
	{
		method: 'POST',
		path: Routes.USER_DEVICE,
		config: ApiConfig.USER_DEVICE,
		handler: Service.addDevice
	}
];