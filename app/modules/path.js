'use strict';

module.exports = {
    default: (request, reply) => {
        reply.file('client/index.html');
    },
    error404: (request, reply) => {
        reply.file('app/views/404.html');
    },
    token: (request, reply) => {
        return reply({valid: 1, token: request.auth.token});
    }
};