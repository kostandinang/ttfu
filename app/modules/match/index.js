'use strict';

const Joi = require('joi');
const Service = require('./service');
const Api = require('../../lib/api');

const PayloadValidationScheme = {
    query: {
        from: Joi.date().timestamp().raw(),
    },
    failAction: Api.invalidParams
};

module.exports = {
    Cfg: {
        validate: PayloadValidationScheme
    },
    Service: Service
};