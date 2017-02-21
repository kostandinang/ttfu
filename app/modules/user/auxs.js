'use strict';

const
	Model = require('./model').User;

module.exports = {
	getUserObj: (params) => {
		return {
			[Model.USERNAME]: params.username,
			[Model.EMAIL]: params.email,
			[Model.FIRST_NAME]: params.firstName,
			[Model.LAST_NAME]: params.lastName,
			[Model.PHOTO_URL]: params.photoUrl,
			[Model.FB_ID]: params.fbId,
			[Model.IS_ADMIN]: false,
		};
	}
};