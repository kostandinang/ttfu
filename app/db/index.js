'use strict';

const Q = require('q');
const Cfg = require('../config');
const Log = require('../lib/log');

const options = {
    promiseLib: Q
};

let pgp = require('pg-promise')(options);
let db = pgp(Cfg.DBString);

let repo = {
    user: require('./repo/user')(db)
};

module.exports = repo;