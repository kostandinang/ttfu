'use strict';

const Hapi = require('Hapi');
const Log = require('./lib/log');
const Cfg = require('./config');
const Auth = require('./modules/auth');
const Registrations = require('./registrations');
const Routes = require('./routes');

const server = new Hapi.Server();

let init = () => {
    server.connection({
        host: Cfg.HOST,
        port: Cfg.PORT
    });

    /**
     * Register Plugins
     * Add Authentication Strategies
     * Register Routes
     * Start Server
     */
    Registrations(server).then(() => {
        Auth.addAuthStrategies(server);
        Routes(server);
        server.start((err) => {
            if (err) {
                Log.error(err.message, err);
            }
            Log.info('Server started @' + Cfg.HOST + ':' + Cfg.PORT);
        });
    });
};

module.exports = {
    init: init
};