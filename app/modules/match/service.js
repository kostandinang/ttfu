'use strict';

const
	Promise = require('bluebird'),
	Log = require('../../lib/log'),
	DB = require('../../db'),
	Api = require('../../lib/api'),
	Model = require('./model'),
	DBUtil = require('../../lib/util').Db,
	Repo = require('./repo')(DB);

const getMatchParams = req => {
	let obj = {};
	let fromTS = req.query[Model._Params.FROM];
	if (fromTS) {
		obj[Model._Params.FROM] = DBUtil.formatDBTime(fromTS);
	}
	return obj;
};

const getMatchByIdParams = req => {
	return {
		[Model._Params.ID]: req.params[Model._Params.ID] || 0
	}
};

const getMatchPayload = req => {
	const params = {};
	[
		Model.DESCRIPTION,
		Model.LOCATION,
		Model.LAT,
		Model.LNG,
		Model.MAX_PLAYERS,
		Model.MIN_PLAYERS,
		Model.Team.TEAM1_NAME,
		Model.Team.TEAM2_NAME,
		Model.Team.TEAM1_COLOR_HEX,
		Model.Team.TEAM2_COLOR_HEX,
	].map(key => {
		params[key] = req.payload[key];
	});
	params[Model.DUE_DATE] = DBUtil.formatDBTime(req.payload[Model.DUE_DATE]);
	return params;
};

module.exports = {
	
	/**
	 * Find match by id
	 * @param request
	 * @param reply
	 */
	findById: (request, reply) => {
		return new Promise((resolve, reject) => {
			let params = getMatchByIdParams(request);
			Repo.findById(params).then(res => {
				Api.write(reply, res, {omitMetadata: true});
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	},
	
	/**
	 * Find filtered matches
	 * @param request
	 * @param reply
	 */
	find: (request, reply) => {
		return new Promise((resolve, reject) => {
			let params = getMatchParams(request);
			Repo.find(params).then(res => {
				Api.write(reply, res, Api.DEFAULTS);
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	},
	
	/**
	 * Add a match
	 * @param request
	 * @param reply
	 */
	add: (request, reply) => {
		return new Promise((resolve, reject) => {
			let params = getMatchPayload(request);
			Repo.add(params).then(res => {
				if (res.rowCount) {
					Api.success(reply, res);
				} else {
					Api.notModified(reply);
				}
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	},
	
	/**
	 * Remove a match
	 * @param request
	 * @param reply
	 */
	remove: (request, reply) => {
		return new Promise((resolve, reject) => {
			let params = getMatchByIdParams(request);
			Repo.remove(params).then(res => {
				if (res.rowCount) {
					Api.success(reply, res);
				} else {
					Api.notModified(reply);
				}
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	}
};