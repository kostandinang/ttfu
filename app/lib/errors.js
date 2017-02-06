'use strict';

module.exports = {
    InvalidParams: err => ({
        type: 'PARAMS_INVALID',
        code: 100,
        message: err.message
    })
};