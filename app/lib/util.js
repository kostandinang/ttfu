'use strict';

const Moment = require('moment');
const _ = require('lodash');

module.exports = {
	/**
	 * Database Utils
	 */
	Db: {
		getObjValues: obj => {
			return Object.keys(obj).map(e => {
				return obj[e]
			})
		},
		formatDBTime: ts => {
			return Moment(Number.parseFloat(ts)).format('YYYY-MM-DD HH:ss');
		},
		formatResponse: data => {
			return _.omit(data, ['created_at', 'updated_at', 'deleted_at'])
		}
	}
};