const Hapi = require('hapi');
const Log = require('./lib/log');
const Cfg = require('./config');
const Auth = require('./modules/auth');
const RegisterPlugins = require('./plugins');
const Routes = require('./routes');

const server = new Hapi.Server();

let init = () => {
    server.connection({
        host: Cfg.HOST,
        port: Cfg.PORT,
        routes: {
            cors: true
        }
    });

    /**
     * Register Plugins
     * Add Authentication Strategies
     * Register Routes
     * Start Server
     */
    RegisterPlugins(server).then(() => {
        Auth.Plugin.registerAuth(server);
        Routes(server);
        server.start((err) => {
            if (err) {
                Log.error(err.message, err);
            }
            Log.info('Server started @' + Cfg.HOST + ':' + Cfg.PORT);
        });
    });
};

module.exports = {
    init: init
};