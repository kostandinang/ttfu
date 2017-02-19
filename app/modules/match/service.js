'use strict';

const
	Promise = require('bluebird'),
	Log = require('../../lib/log'),
	DB = require('../../db'),
	Api = require('../../lib/api'),
	Model = require('./model'),
	DBUtil = require('../../lib/util').Db;

const Repo = require('./repo')(DB);

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

module.exports = {
	findById: (request, reply) => {
		return new Promise((resolve, reject) => {
			let params = getMatchByIdParams(request);
			Repo.findById(params).then(res => {
				Api.write(reply, res);
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	},
	find: (request, reply) => {
		return new Promise((resolve, reject) => {
			let params = getMatchParams(request);
			Repo.find(params).then(res => {
				Api.write(reply, res);
			}).catch(err => {
				Api.badRequest(reply, err);
			});
		});
	},
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