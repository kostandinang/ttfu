'use strict';

const Cfg = require('./config');
const Mods = require('./modules');

const NO_AUTH = { auth: false };

module.exports = server => {

    /**
     * Static Page Servings
     */
    server.route({
        method: 'GET',
        path: Cfg.Routes.ROOT,
        config: NO_AUTH,
        handler: Mods.Path.default
    });
    server.route({
        method: 'GET',
        path: Cfg.Routes.TOKEN,
        handler: Mods.Path.token
    });
    server.route({
        method: 'GET',
        path: Cfg.Routes.NOT_FOUND,
        config: NO_AUTH,
        handler: Mods.Path.error404
    });

    /**
     * Authorization
     */
    server.route({
        method: 'GET',
        path: Cfg.Routes.FB_LOGIN,
        config: Mods.Auth.FBRouteCfg
    });
    server.route({
        method: 'GET',
        path: Cfg.Routes.LOGIN,
        handler: Mods.Auth.login
    });

    /**
     * User Actions
     */
    server.route({
        method: 'POST',
        path: Cfg.Routes.USER_DEVICE,
        config: Mods.User.Cfg,
        handler: Mods.User.Actions.addDevice
    });

    /**
     * Match
     */
    server.route({
        method: 'GET',
        path: Cfg.Routes.MATCH,
        config: Mods.Match.Cfg,
        handler: Mods.Match.Actions.find
    });

};