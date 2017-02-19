'use strict';

module.exports = basePath => {
	return {
		ROOT: '/',
		NOT_FOUND: '/404',
		FB_LOGIN: basePath + 'fblogin',
		FB_AUTH: '/fbauth',
		USER_BY_ID: basePath + 'user/{user_id}',
		USER_DEVICE: basePath + 'user/device',
		MATCH: basePath + 'match',
		MATCH_BY_ID: basePath + 'match/{id}',
		MEMBER: basePath + 'member'
	}
};