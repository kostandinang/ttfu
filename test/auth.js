'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Cfg = require('../app/config');
const Jwt = require('../app/lib/jwt');
const Log = require('../app/lib/log');

const expect = Code.expect;
const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

lab.experiment('Auth', () => {
    lab.test('Generate Token Key', (done) => {
        Jwt.generate({user_id: 1}).then((token) => {
            Log.info("Token generated: ", token);
            expect(token).to.match(JWT_REGEX);
            done();
        }).catch((err) => {
            Log.error(err.message);
            done();
        });
    })
});
