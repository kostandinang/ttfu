'use strict';

const Cfg = require('./config');
const Mods = require('./modules');

const Url = {
    LOGIN: Cfg.API_URL + 'login',
    FB_LOGIN: '/fblogin',
    TOKEN: '/token',
};

const NO_AUTH = { auth: false };

let inject = (server, Auth) => {
    server.route({method: 'GET', path: '/', config: NO_AUTH, handler: Mods.Path.default});
    server.route({method: 'GET', path: '/status', config: NO_AUTH, handler: Mods.Path.status});
    server.route({method: 'GET', path: '/404', config: NO_AUTH, handler: Mods.Path.error404});
    server.route({method: 'GET', path: Url.FB_LOGIN, config: Auth.FBRouteCfg});
    server.route({method: 'GET', path: Url.LOGIN, handler: Auth.login});
    server.route({method: 'GET', path: Url.TOKEN, handler: Mods.Path.token});
};

module.exports = {
    Url: Url,
    inject: inject
};