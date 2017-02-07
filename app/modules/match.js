'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const db = require('../db/');
const Log = require('../lib/log');
const Api = require('../lib/api');
const Models = require('../db/models');
const Cfg = require('../config');
const DBUtil = require('../lib/util').DB;
const MatchModel = Models.Match;

const PayloadValidationScheme = {
    query: {
        from: Joi.date().timestamp().raw(),
    },
    failAction: Api.invalidParams
};

const getMatchParams = req => {
    let obj = {};
    let fromTS = req.query[MatchModel._Params.FROM];
    if (fromTS) {
        obj[MatchModel._Params.FROM] = DBUtil.formatDBTime(fromTS);
    }
    return obj;
};

const getMatchByIdParams = req => {
    let obj = {};
    obj[MatchModel._Params.ID] = req.params[MatchModel._Params.ID] || 0;
    return obj;
};

module.exports = {
    Cfg: {
        validate: PayloadValidationScheme
    },
    Actions: {
        findById: (request, reply) => {
            let $ = Promise.pending();
            let params = getMatchByIdParams(request);
            db.match.findById(params).then(res => {
                Api.write(reply, res);
            }).catch(err => {
                Api.badRequest(reply, err);
            });
            return $.promise;
        },
        find: (request, reply) => {
            let $ = Promise.pending();
            let params = getMatchParams(request);
            db.match.find(params).then(res => {
                Api.write(reply, res);
            }).catch(err => {
                Api.badRequest(reply, err);
            });
            return $.promise;
        },
        remove: (request, reply) => {
            let $ = Promise.pending();
            let params = getMatchByIdParams(request);
            db.match.remove(params).then(res => {
                if (res.rowCount) {
                    Api.success(reply, res);
                } else {
                    Api.notModified(reply);
                }
            }).catch(err => {
                Api.badRequest(reply, err);
            });
            return $.promise;
        }
    }
};