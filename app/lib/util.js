'use strict';

const
	_ = require('lodash'),
	Moment = require('moment'),
	Fs = require('fs'),
	Path = require('path');

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
	},
	Module: {
		/**
		 * Read Module
		 */
		readModule: (dir) => {
			let config = {};
			let files = Fs.readdirSync(dir, {});
			_.remove(files, (el) => {
				return el == 'index.js';
			});
			files.map((file) => {
				file = file.substr(0, file.lastIndexOf('.js'));
				config[file] = require(Path.join(dir, file));
			});
			return config;
		}
	}
};