'use strict';

const Model = require('../models').Match;
const DBUtil = require('../util');

const TABLE = 'public.match';

const Sql = {
    FIND:
        `select * from ${TABLE} WHERE ${Model.DUE_DATE} > $/${Model._Params.FROM}/;`
};

module.exports = db => {
    return {
        find: params => {
            return db.query(Sql.FIND, params);
        }
    };
};