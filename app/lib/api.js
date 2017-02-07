'use strict';

const Log = require('./log');
const Errors = require('./errors');

module.exports = {
    redirect: (reply, url) => {
        reply.redirect(url);
    },
    error: (reply, err) => {
        Log.error(err.message, err);
        return reply(Errors.Generic(err)).code(400);
    },
    paramValidationErr: (request, reply, source, err) => {
        return reply(Errors.InvalidParams(err)).code(400);
    }
};