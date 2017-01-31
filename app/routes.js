'use strict';

const defaultRoute = (request, reply) => {
    reply.file('client/index.html');
};

const apiRoute = (request, reply) => {
    return reply({apiStatus: 1}); //
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