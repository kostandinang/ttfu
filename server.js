'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';

const Hapi = require('Hapi');
const Config = require('./config')(NODE_ENV);
const server = new Hapi.Server();

server.connection({
    host: Config.HOST,
    port: Config.PORT
});

require('./app')(server);

server.start((err) => {
    if(err) {
        throw err;
    }
    console.log("Server Running on PORT=" + Config.PORT);
});


