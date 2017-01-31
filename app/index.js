'use strict';

//Set up hapi app
const app = (server) => {
    require('./registers')(server);
    require('./routes')(server);
};

module.exports = app;