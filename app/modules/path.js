'use strict';

module.exports = {
    default: (request, reply) => {
        reply.file('client/index.html');
    },
    error404: (request, reply) => {
        reply.file('app/views/404.html');
    }
};