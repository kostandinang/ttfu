'use strict';

const Joi = require('joi');
const Api = require('../../lib/api');
const Service = require('./service');
const Model = require('./model');

const Config = {
    validate: {
        payload: {},
        failAction: Api.invalidParams
    }
};

module.exports = {
    Config: Config,
    Service: Service,
    Model: Model
};