'use strict';

const
	Promise = require('bluebird'),
	DB = require('../../db'),
	Api = require('../../lib/api'),
	Repo = require('./repo')(DB),
	Models = require('./model'),
	UserModel = Models.User,
	UserDeviceModel = Models.UserDevice;

const getUserDeviceData = req => {
	return {
		[UserDeviceModel.USER_ID]: req.payload[UserDeviceModel.USER_ID],
		[UserDeviceModel.DEVICE_ID]: req.payload[UserDeviceModel.DEVICE_ID],
		[UserDeviceModel.CREATED_AT]: new Date(),
		[UserDeviceModel.ACTIVE]: true
	};
};

const getUserData = req => {
	return {
		[UserModel.USER_ID]: req.params[UserModel.USER_ID]
	}
};

module.exports = {
	findByFacebookId: (request, reply, data) => {
		return new Promise((resolve, reject) => {
			Repo.findByFacebookId(data).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	},
	find: (request, reply) => {
		return new Promise((resolve, reject) => {
			let userData = getUserData(request);
			Repo.find(userData).then(res => {
				Api.write(reply, res, Api.DEFAULT_OPTIONS);
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		})
	},
	add: (request, reply, data) => {
		return new Promise((resolve, reject) => {
			Repo.add(data).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	},
	addDevice: (request, reply) => {
		return new Promise((resolve, reject) => {
			let userDeviceData = getUserDeviceData(request);
			Repo.addDevice(userDeviceData).then(res => {
				Api.write(reply, res);
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	}
};