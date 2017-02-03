'use strict';

const Log = require('./../lib/log');
const Cfg = require('../config/index');
const User = require('./user');

let registerAuthStrategies = (server) => {
    server.auth.strategy('facebook', 'bell', {
        provider: 'facebook',
        password: 'cookie_encryption_password_secure',
        isSecure: false,
        clientId: Cfg.FB_CLIENT_ID,
        clientSecret: Cfg.FB_CLIENT_SECRET,
        location: server.info.uri
    });
};

let login = (request, reply) => {
    return reply({token: 'TOKEN_HERE'});
};

let fbLogin = (request, reply) => {
    User.add(request, reply, request.auth.credentials);
};

const FBRouteCfg = {
    auth: {
        strategy: 'facebook',
        mode: 'try'
    },
    handler: fbLogin
};

module.exports = {
    login: login,
    fbLogin: fbLogin,
    registerAuthStrategies: registerAuthStrategies,
    FBRouteCfg: FBRouteCfg
};