'use strict';

const db = require('../');

module.exports = db => {
    return {
        find: () => {
            return db.query('select * from public.user')
        }
    };
};