'use strict';

module.exports = (db) => {
    return {
        user: require('./user')(db)
    };
};