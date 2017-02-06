'use strict';

const Cfg = require('./config');
const Mods = require('./modules');

const NO_AUTH = { auth: false };

module.exports = server => {
    server.route({method: 'GET', path: '/', config: NO_AUTH, handler: Mods.Path.default});
    server.route({method: 'GET', path: '/status', config: NO_AUTH, handler: Mods.Path.status});
    server.route({method: 'GET', path: '/404', config: NO_AUTH, handler: Mods.Path.error404});
    server.route({method: 'GET', path: Cfg.Routes.FB_LOGIN, config: Mods.Auth.FBRouteCfg});
    server.route({method: 'GET', path: Cfg.Routes.LOGIN, handler: Mods.Auth.login});
    server.route({method: 'GET', path: Cfg.Routes.TOKEN, handler: Mods.Path.token});
    server.route({method: 'POST', path: Cfg.Routes.USER_DEVICE, config: Mods.User.Cfg, handler: Mods.User.Actions.addDevice});
};