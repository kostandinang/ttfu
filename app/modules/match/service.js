'use strict';

const Promise = require('bluebird');
const Log = require('../../lib/log');
const DB = require('../../db');
const Api = require('../../lib/api');
const Model = require('./model');
const DBUtil = require('../../lib/util').Db;

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
		let $ = Promise.pending();
		let params = getMatchByIdParams(request);
		Repo.findById(params).then(res => {
			Api.write(reply, res);
		}).catch(err => {
			Api.badRequest(reply, err);
		});
		return $.promise;
	},
	find: (request, reply) => {
		let $ = Promise.pending();
		let params = getMatchParams(request);
		Repo.find(params).then(res => {
			Api.write(reply, res);
		}).catch(err => {
			Api.badRequest(reply, err);
		});
		return $.promise;
	},
	remove: (request, reply) => {
		let $ = Promise.pending();
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
		return $.promise;
	}
};