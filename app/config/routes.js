'use strict';

module.exports = basePath => {
    return {
        ROOT: '/',
        NOT_FOUND: '/404',
        FB_LOGIN: '/fblogin',
        TOKEN: basePath + 'token',
        LOGIN: basePath + 'login',
        USER_DEVICE: basePath + 'user/device',
        MATCH: basePath + 'match'
    }
};