const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Cfg = require('../app/config');

lab.experiment('Environment', () => {

    lab.test('Is development Environment', (done) => {
        Code.expect(Cfg.HOST).to.equal('localhost');
        done();
    });

});