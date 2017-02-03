'use strict';

module.exports = {
    default: (request, reply) => {
        reply.file('client/index.html');
    },
    status: (request, reply) => {
        return reply({apiStatus: 1});
    },
    error404: (request, reply) => {
        reply.file('app/views/404.html');
    },
    token: (request, reply) => {
        return reply({token_validated: 1, token: request.auth.token});
    }
};