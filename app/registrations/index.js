'use strict';

const Q = require('q');
const Inert = require('inert');
const Good = require('good');
const Bell = require('bell');
const Auth = require('./../modules/auth/index');
const Log = require('../lib/log');

let registrations = (server) => {
    let def = Q.defer();
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
            def.reject();
        }
        def.resolve();
    });

    return def.promise;
};

module.exports = registrations;