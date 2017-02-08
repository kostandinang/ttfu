'use strict';

const Model = require('./model');
const DBUtil = require('../../lib/util').DB;

const TABLE = 'public.match';

const Helpers = {
    ID_MATCH: `${Model.MATCH_ID} = $/${Model._Params.ID}/`,
    FIND_FILTER: ` AND ${Model.DUE_DATE} > $/${Model._Params.FROM}/`
};

const Sql = {
    FIND:
        `select * from ${TABLE} WHERE ${Model.DELETED_AT} IS NULL`,
    DELETE:
        `update ${TABLE} set ${Model.DELETED_AT} = $/${Model.DELETED_AT}/`,
};

module.exports = db => {
    return {
        findById: params => {
            let query = Sql.FIND + ' AND ' + Helpers.ID_MATCH;
            return db.query(query, params);
        },
        find: params => {
            let query = Sql.FIND + ((params[Model._Params.FROM]) ? Helpers.FIND_FILTER : '');
            return db.query(query, params);
        },
        add: params => {

        },
        remove: params => {
            let query = Sql.DELETE + ' WHERE ' + Helpers.ID_MATCH;
            params[Model.DELETED_AT] = new Date();
            return db.result(query, params);
        }
    };
};