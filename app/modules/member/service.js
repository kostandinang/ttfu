'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const DB = require('../../db');
const Api = require('../../lib/api');
const Cfg = require('../../config/index');
const Models = require('./model');
const TeamModel = Models.Team;
const MemberModel = Models.Member;

const PayloadValidationScheme = {
    payload: {
    },
    failAction: Api.invalidParams
};

module.exports = {

};