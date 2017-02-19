'use strict';

const Promise = require('bluebird');
const Cfg = require('./config');
const Log = require('./lib/log');

const options = {
	promiseLib: Promise
};

let pgp = require('pg-promise')(options);
let db = pgp(Cfg.DB_STRING);

module.exports = db;