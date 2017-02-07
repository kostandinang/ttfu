'use strict';

const Boom = require('boom');
const Log = require('./log');
const Cfg = require('../config');

module.exports = {
    write: (reply, data) => {
        reply(data);
    },
    redirect: (reply, url) => {
        reply.redirect(url);
    },
    success: (reply) => {
        reply({success: 1});
    },
    notModified: (reply) => {
        reply(Boom.badRequest(Cfg.Errors.NOT_MODIFIED));
    },
    badRequest: (reply, err) => {
        Log.error(err.message, err);
        reply(Boom.badRequest(err.message, err));
    },
    invalidParams: (request, reply, source, err) => {
        Log.error(err.message, err);
        reply(Boom.badRequest(Cfg.Errors.INVALID_PARAMS, err));
    },
};