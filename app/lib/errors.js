'use strict';

module.exports = {
    Generic: err => ({
        type: 'GENERIC_ERR',
        code: 100,
        message: err.message
    }),
    InvalidParams: err => ({
        type: 'PARAMS_INVALID',
        code: 101,
        message: err.message
    })
};