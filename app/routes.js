'use strict';

const Log = require('./lib/log');
const Auth = require('./modules/auth');

const defaultRoute = (request, reply) => {
    reply.file('client/index.html');
};

const apiRoute = (request, reply) => {
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

    //Login
    server.route({
        method: '*',
        path: '/fblogin',
        config: {
            auth: {
                strategy: 'facebook',
                mode: 'try'
            },
            handler: Auth.handleFBLogin
        }
    });
};

module.exports = routes;