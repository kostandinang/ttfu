'use strict';

const Model = require('../models').User;
const DBUtil = require('../util');

const TABLE = 'public.user';

const Sql = {
    FIND:
        `select * from ${TABLE}`,
    CREATE:
        `insert into ${TABLE} values 
        (
            default,   
            $/${Model.USERNAME}/, 
            $/${Model.FIRST_NAME}/, 
            $/${Model.LAST_NAME}/, 
            $/${Model.PHOTO_URL}/, 
            $/${Model.FB_ID}/, 
            $/${Model.CREATED_AT}/, 
            $/${Model.UPDATED_AT}/, 
            $/${Model.IS_ADMIN}/,
            $/${Model.EMAIL}/
        )`,
    ADD_DEVICE:
        `insert into ${TABLE} values ($1, $2, $3, $4);`
};

module.exports = db => {
    return {
        find: () => {
            return db.query(Sql.FIND);
        },
        add: opts => {
            return db.query(Sql.CREATE, opts);
        },
        addDevice: opts => {
            return db.none(Sql.ADD_DEVICE, DBUtil.getObjValues(opts));
        }
    };
};