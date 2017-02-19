const Glue = require('glue');
const Log = require('./lib/log');
const Config = require('./config');
const Auth = require('./modules/auth');
const Plugins = require('./plugins');

const MANIFEST = {
	connections: [{
			port: Config.PORT
		}
	],
	registrations: Plugins,
};

const OPTIONS = {};

const start = () => {
	Glue.compose(MANIFEST, OPTIONS, (err, server) => {
		server.start((err) => {
			if (err) {
				Log.error(err.message, err);
			}
			Log.info('Server started @' + Config.HOST + ':' + Config.PORT);
		});
	});
};

module.exports = {
	start: start
};