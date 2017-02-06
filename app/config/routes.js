'use strict';

module.exports = basePath => {
    return {
        FB_LOGIN: '/fblogin',
        TOKEN: '/token',
        LOGIN: basePath + 'login',
        USER_DEVICE: basePath + 'user/device'
    }
};