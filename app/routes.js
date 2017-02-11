'use strict';

const Cfg = require('./config');
const Mods = require('./modules');

const NO_AUTH = {
    auth: false
};

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
        path: Cfg.Routes.NOT_FOUND,
        config: NO_AUTH,
        handler: Mods.Path.error404
    });

    /**
     * Authorization
     */
    server.route({
        method: 'GET',
        path: Cfg.Routes.FB_AUTH,
        config: Mods.Auth.Config.FBAuth
    });

    server.route({
        method: 'GET',
        path: Cfg.Routes.FB_LOGIN,
        config: Mods.Auth.Config.FBLogin,
        handler: Mods.Auth.Service.FB_LOGIN
    });

    /**
     * User Actions
     */
    server.route({
        method: 'POST',
        path: Cfg.Routes.USER_DEVICE,
        config: Mods.User.Config,
        handler: Mods.User.Service.addDevice
    });

    /**
     * Match
     */
    server.route({
        method: 'GET',
        path: Cfg.Routes.MATCH,
        config: Mods.Match.Config,
        handler: Mods.Match.Service.find
    });

    server.route({
        method: 'GET',
        path: Cfg.Routes.MATCH_BY_ID,
        config: Mods.Match.Config,
        handler: Mods.Match.Service.findById
    });

    server.route({
        method: 'DELETE',
        path: Cfg.Routes.MATCH_BY_ID,
        config: Mods.Match.Config,
        handler: Mods.Match.Service.remove
    });
};