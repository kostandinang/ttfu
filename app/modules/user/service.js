'use strict';

const
	Promise = require('bluebird'),
	DB = require('../../db'),
	Api = require('../../lib/api'),
	Repo = require('./repo')(DB),
	Models = require('./model'),
	UserModel = Models.User,
	UserDeviceModel = Models.UserDevice,
	Jwt = require('../../lib/jwt');

const getUserDeviceData = req => {
	return {
		[UserDeviceModel.USER_ID]: req.payload[UserDeviceModel.USER_ID],
		[UserDeviceModel.DEVICE_ID]: req.payload[UserDeviceModel.DEVICE_ID],
		[UserDeviceModel.CREATED_AT]: new Date(),
		[UserDeviceModel.ACTIVE]: true
	};
};

module.exports = {
	
	/**
	 * Query user from facebook
	 * @param request
	 * @param reply
	 * @param data
	 */
	findByFacebookId: (request, reply, data) => {
		return new Promise((resolve, reject) => {
			Repo.findByFacebookId(data).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	},
	
	/**
	 * Get user from user_id stored in token
	 * @param request
	 * @param reply
	 */
	find: (request, reply) => {
		return new Promise((resolve, reject) => {
			let tokenPayload = Jwt.getTokenPayload(request);
			const query = {
				[Models.User.USER_ID]: tokenPayload[Models.User.USER_ID]
			};
			Repo.find(query).then(res => {
				Api.write(reply, res, Api.DEFAULTS);
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		})
	},
	
	/**
	 * Adds a user
	 * @param request
	 * @param reply
	 * @param data
	 */
	add: (request, reply, data) => {
		return new Promise((resolve, reject) => {
			Repo.add(data).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	},
	
	/**
	 * Adds a user device
	 * @param request
	 * @param reply
	 */
	addDevice: (request, reply) => {
		return new Promise((resolve, reject) => {
			let userDeviceData = getUserDeviceData(request);
			Repo.addDevice(userDeviceData).then(res => {
				Api.write(reply, res, Api.DEFAULTS);
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	}
};