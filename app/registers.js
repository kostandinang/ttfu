'use strict';

const Inert = require("inert");
const Good = require("good");

const registers = (server) => {

    //Static file serve
    server.register(Inert, (err) => {
        if (err) {
            console.error(err.message); //TODO - Change to global log handler
        }
    });

    //Console decorator
    server.register({
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
    }, (err) => {
        if (err) {
            throw err; // something bad happened loading the plugin
        }
    });
};

module.exports = registers;