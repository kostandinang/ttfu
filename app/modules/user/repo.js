'use strict';

const Model = require('./model').User;
const DBUtil = require('../../lib/util').DB;

const TABLE = 'public.user';
const USER_DEVICE_TABLE = 'public.user_device';

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
        `insert into ${USER_DEVICE_TABLE} values ($1, $2, $3, $4);`
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