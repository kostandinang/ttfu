'use strict';

const Promise = require('bluebird');
const Jwt = require('jsonwebtoken');
const Cfg = require('../config');
const Log = require('../lib/log');

const jwt = {
	/**
	 * Generate JWT Token
	 * @param data
	 * data: {}
	 */
	generate: (data) => {
		return new Promise((resolve, reject) => {
			Jwt.sign(
				{
					data: data
				},
				Cfg.APP_SECRET,
				{},
				(err, token) => {
					if (err) {
						Log.error(err.message, err);
						reject(err);
					} else {
						resolve(token);
					}
				});
		});
	},
	
	/**
	 * Verify JWT Token
	 * @param token
	 */
	verify: (token, request, cb) => {
		Jwt.verify(request.auth.token, Cfg.APP_SECRET, (err, body) => {
			if (err) {
				Log.error(err.message, err);
				cb(err, false);
			} else {
				cb(null, true, body);
			}
		});
	},
	
	/**
	 * Get token payload
	 * @param request
	 */
	getTokenPayload: (request) => {
		return request.auth.credentials.data;
	}
};

module.exports = jwt;