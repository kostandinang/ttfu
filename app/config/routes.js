'use strict';

module.exports = basePath => {
	return {
		/**
		 * Defaults
		 */
		ROOT: '/',
		NOT_FOUND: '/404',
		/**
		 * Authentication
		 */
		FB_LOGIN: basePath + 'fblogin',
		FB_AUTH: '/fbauth',
		/**
		 * User
		 */
		USER_BY_ID: basePath + 'user/{user_id}',
		USER_DEVICE: basePath + 'user/device',
		/**
		 * Match
		 */
		MATCH: basePath + 'match',
		MATCH_BY_ID: basePath + 'match/{id}',
		MEMBER: basePath + 'member'
	}
};