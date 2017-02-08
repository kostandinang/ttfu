'use strict';

const Joi = require('joi');
const Api = require('../../lib/api');
const Service = require('./service');

const PayloadValidationScheme = {
    payload: {
        device_id: Joi.string().required(),
        user_id: Joi.number().required()
    },
    failAction: Api.invalidParams
};


module.exports = {
    Cfg: {
        validate: PayloadValidationScheme
    },
    Service: Service
};