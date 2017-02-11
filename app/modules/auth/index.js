'use strict';

const Joi = require('joi');
const Api = require('../../lib/api');
const Cfg = require('../../config');
const Jwt = require('../../lib/jwt');
const Service = require('./service');
const Model = require('./model');

const FBAuthCfg = {
    auth: {
        strategy: 'facebook',
        mode: 'try'
    },
    handler: Service.fbAuth
};

const FBLoginCfg = {
    auth: false,
    validate: {
        query: {
            [Model._Params.FB_TOKEN]: Joi.string().required(),
        },
        failAction: Api.invalidParams,
    },
    handler: Service.fbLogin
};

const Plugin = {
    registerAuth: server => {
        server.auth.strategy('facebook', 'bell', {
            provider: 'facebook',
            password: 'cookie_encryption_password_secure',
            isSecure: false,
            clientId: Cfg.FB_CLIENT_ID,
            clientSecret: Cfg.FB_CLIENT_SECRET,
            location: server.info.uri
        });
        server.auth.strategy('jwt', 'jwt', {
            key: Cfg.APP_SECRET,
            validateFunc: Jwt.verify,
            verifyOptions: {algorithms: ['HS256']},
            tokenType: 'Bearer'
        });
        server.auth.default('jwt');
    }
};

module.exports = {
    Config: {
        FBAuth: FBAuthCfg,
        FBLogin: FBLoginCfg
    },
    Service: Service,
    Model: Model,
    Plugin: Plugin
};