'use strict';

const Model = require('../models').Match;
const DBUtil = require('../../lib/util').DB;

const TABLE = 'public.match';

const Helpers = {
    FIND_FILTER: ` WHERE ${Model.DUE_DATE} > $/${Model._Params.FROM}/`
};

const Sql = {
    FIND:
        `select * from ${TABLE}`
};

module.exports = db => {
    return {
        find: params => {
            let query = Sql.FIND + ((params[Model._Params.FROM]) ? Helpers.FIND_FILTER : '');
            return db.query(query, params);
        }
    };
};