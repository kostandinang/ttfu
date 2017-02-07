'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const db = require('../db/');
const Log = require('../lib/log');
const Api = require('../lib/api');
const Models = require('../db/models');
const Cfg = require('../config');
const DBUtil = require('../db/util');
const MatchModel = Models.Match;

const PayloadValidationScheme = {
    query: {
        from: Joi.date().timestamp().raw(),
    },
    failAction: Api.paramValidationErr
};

const getMatchParams = req => {
    let obj = {};
    let fromTS = req.query[MatchModel._Params.FROM];
    obj[MatchModel._Params.FROM] = DBUtil.formatDBTime(fromTS);
    return obj;
};

module.exports = {
    Cfg: {
        validate: PayloadValidationScheme
    },
    Actions: {
        find: (request, reply) => {
            let $ = Promise.pending();
            let params = getMatchParams(request);
            db.match.find(params).then(res => {
                return reply(res);
            }).catch(err => {
                Api.error(reply, err)
            });
            return $.promise;
        }
    }
};