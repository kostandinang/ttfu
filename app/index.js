'use strict';

const Hapi = require('Hapi');
const Log = require('./lib/log');
const Cfg = require('./config');
const server = new Hapi.Server();

let init = () => {
    server.connection({
        host: Cfg.HOST,
        port: Cfg.PORT
    });

    require('./registers')(server);
    require('./routes')(server);

    server.start((err) => {
        if (err) {
            throw err;
        }
        Log.info('Server started @' + Cfg.HOST + ':' + Cfg.PORT);
    });
};

module.exports = {
    init: init
};