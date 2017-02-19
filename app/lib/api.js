'use strict';

const Boom = require('boom');
const Log = require('./log');
const Cfg = require('../config');
const Util = require('../lib/util');

const transform = (res, opts) => {
	if (opts) {
		if (opts.omitMetadata) {
			res = Util.Db.formatResponse(res);
		}
	}
	return res;
};

module.exports = {
	DEFAULT_OPTIONS: {
		omitMetadata: true
	},
	write: (reply, res, opts) => {
		res = transform(res, opts);
		return reply(res.data || res);
	},
	redirect: (reply, url) => {
		return reply.redirect(url);
	},
	success: (reply) => {
		return reply({success: 1});
	},
	notModified: (reply) => {
		return reply(Boom.badRequest(Cfg.Errors.NOT_MODIFIED));
	},
	badRequest: (reply, err) => {
		Log.error(err.message, err);
		return reply(Boom.badRequest(err.message, err));
	},
	invalidParams: (request, reply, source, err) => {
		Log.error(err.message, err);
		return reply(Boom.badRequest(Cfg.Errors.INVALID_PARAMS, err));
	},
};