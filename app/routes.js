'use strict';

const Cfg = require('./config');
const Mods = require('./modules');

const Url = {
    LOGIN: Cfg.API_URL + 'login',
    FB_LOGIN: '/fblogin',
};

let inject = (server, Auth) => {
    server.route({method: 'GET', path: '/', handler: Mods.Path.default});
    server.route({method: 'GET', path: '/status', handler: Mods.Path.status});
    server.route({method: 'GET', path: '/404', handler: Mods.Path.error404});
    server.route({method: 'GET', path: Url.FB_LOGIN, config: Auth.FBRouteCfg});
    server.route({method: 'GET', path: Url.LOGIN, handler: Auth.login});
};

module.exports = {
    Url: Url,
    inject: inject
};