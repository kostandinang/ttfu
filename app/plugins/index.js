'use strict';

const Promise = require('bluebird');
const Inert = require('inert');
const Good = require('good');
const Bell = require('bell');
const Log = require('../lib/log');

let plugins = (server) => {
    let $ = Promise.pending();
    const registrations = [
        Inert,
        Bell,
        {
            register: Good,
            options: {
                reporters: {
                    console: [{
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{
                            response: '*',
                            log: '*'
                        }]
                    }, {
                        module: 'good-console'
                    }, 'stdout']
                }
            }
        }
    ];

    server.register(registrations, (err) => {
        if (err) {
            Log.error(err.message, err);
            $.reject();
        }
        $.resolve();
    });

    return $.promise;
};

module.exports = plugins;