'use strict';

const Log = require('./lib/log');

const defaultRoute = (request, reply) => {
    reply.file('client/index.html');
};

const apiRoute = (request, reply) => {
    Log.error("Test Error");
    Log.info("Test info");
    return reply({apiStatus: 1});
};

const routes = (server) => {

    // Dashboard Route
    server.route({
        method: 'GET',
        path: '/',
        handler: defaultRoute
    });

    //API Route
    server.route({
        method: 'GET',
        path: '/api',
        handler: apiRoute
    });
};

module.exports = routes;