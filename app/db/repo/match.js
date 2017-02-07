'use strict';

const Model = require('../models').Match;
const DBUtil = require('../../lib/util').DB;

const TABLE = 'public.match';

const Helpers = {
    ID_MATCH: ` WHERE ${Model.MATCH_ID} = $/${Model._Params.ID}/`,
    FIND_FILTER: ` WHERE ${Model.DUE_DATE} > $/${Model._Params.FROM}/`
};

const Sql = {
    FIND:
        `select * from ${TABLE}`
};

module.exports = db => {
    return {
        findById: params => {
            let query = Sql.FIND + ((params[Model._Params.ID]) ? Helpers.ID_MATCH : '');
            return db.query(query, params);
        },
        find: params => {
            let query = Sql.FIND + ((params[Model._Params.FROM]) ? Helpers.FIND_FILTER : '');
            return db.query(query, params);
        }
    };
};