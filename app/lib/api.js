'use strict';

const Log = require('./log');

const api = {
    redirect: (reply, url) => {
        reply.redirect(url);
    },
    error: (reply, err) => {
        Log.error(err.message, err);
        return reply({
            err: 1
        });
    }
};

module.exports = api;