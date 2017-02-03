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
    }
};