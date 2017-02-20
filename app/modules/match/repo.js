'use strict';

const
	Model = require('./model');

const TABLE = 'public.match';
const TEAM_TABLE = 'public.team';
const ADD_MATCH_FUNC = 'public.match_add';

const Projections = {
	MATCH: `${Model.MATCH_ID}, ${Model.DUE_DATE}, ${Model.LOCATION}, ${Model.LAT}, ${Model.LNG}, ${Model.MAX_PLAYERS}, ${Model.MIN_PLAYERS}`
};

const Helpers = {
	ID_MATCH: `${Model.MATCH_ID} = $/${Model._Params.ID}/`,
	FIND_FILTER: ` AND ${Model.DUE_DATE} > $/${Model._Params.FROM}/`
};

const Sql = {
	FIND: `select ${Projections.MATCH} from ${TABLE} WHERE ${Model.DELETED_AT} IS NULL`,
	DELETE: `update ${TABLE} set ${Model.DELETED_AT} = $/${Model.DELETED_AT}/`,
};

const getCreateFields = params => {
	return [
		params[Model.DUE_DATE],
		params[Model.DESCRIPTION],
		params[Model.LOCATION],
		params[Model.LAT],
		params[Model.LNG],
		params[Model.MAX_PLAYERS],
		params[Model.MIN_PLAYERS],
		params[Model.CREATED_AT],
		params[Model.UPDATED_AT],
		params[Model.Team.TEAM1_NAME],
		params[Model.Team.TEAM2_NAME],
		params[Model.Team.TEAM1_COLOR_HEX],
		params[Model.Team.TEAM2_COLOR_HEX]
	]
};

module.exports = db => {
	return {
		findById: params => {
			let query = Sql.FIND + ' AND ' + Helpers.ID_MATCH;
			return db.query(query, params);
		},
		find: params => {
			let query = Sql.FIND + ((params[Model._Params.FROM]) ? Helpers.FIND_FILTER : '');
			return db.query(query, params);
		},
		add: params => {
			return db.func(ADD_MATCH_FUNC, getCreateFields(params));
		},
		remove: params => {
			let query = Sql.DELETE + ' WHERE ' + Helpers.ID_MATCH;
			params[Model.DELETED_AT] = new Date();
			return db.result(query, params);
		}
	};
};