'use strict';

const
	Model = require('./model').User,
	DBUtil = require('../../lib/util').Db;

const TABLE = 'public.user';
const USER_DEVICE_TABLE = 'public.user_device';

const Projections = {
	USER: `${Model.USER_ID}, ${Model.USERNAME}, ${Model.FIRST_NAME}, ${Model.LAST_NAME}, ${Model.EMAIL}, ${Model.FB_ID}, ${Model.PHOTO_URL}, ${Model.IS_ADMIN}`
};

const Sql = {
	FIND: `select ${Projections.USER} from ${TABLE} WHERE ${Model.USER_ID}=$/${Model.USER_ID}/`,
	FIND_FB_ID: `select ${Projections.USER} from ${TABLE} WHERE ${Model.FB_ID}=$/${Model.FB_ID}/`,
	CREATE: `insert into ${TABLE} values 
        (
            default,   
            $/${Model.USERNAME}/, 
            $/${Model.FIRST_NAME}/, 
            $/${Model.LAST_NAME}/, 
            $/${Model.PHOTO_URL}/, 
            $/${Model.FB_ID}/, 
            $/${Model.IS_ADMIN}/,
            $/${Model.EMAIL}/
        ) RETURNING ${Model.USER_ID}`,
	ADD_DEVICE: `insert into ${USER_DEVICE_TABLE} values ($1, $2, $3, $4);`
};

module.exports = db => {
	return {
		find: opts => {
			return db.one(Sql.FIND, opts);
		},
		findByFacebookId: opts => {
			return db.one(Sql.FIND_FB_ID, opts);
		},
		add: opts => {
			return db.one(Sql.CREATE, opts);
		},
		addDevice: opts => {
			return db.none(Sql.ADD_DEVICE, DBUtil.getObjValues(opts));
		}
	};
};