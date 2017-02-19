'use strict';

const Boom = require('boom');
const Log = require('./log');
const Cfg = require('../config');
const Util = require('../lib/util');

module.exports = {
	DEFAULTS: {},
	write: (reply, res, opts) => {
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