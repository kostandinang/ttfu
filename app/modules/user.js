'use strict';

const Promise = require('bluebird');
const db = require('../db/');
const Log = require('../lib/log');
const Routes = require('../routes');
const Api = require('../lib/api');

let user = {
    add: (request, reply, data) => {
        let opts = {
            userName: data.profile.displayName,
            firstName: data.profile.name.first,
            lastName: data.profile.name.last,
            photoUrl: '',
            fbId: data.profile.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        let $ = Promise.pending();
        db.user.add(opts).then(res => {
            Api.redirect(reply, Routes.Url.LOGIN)
        }).catch(err => {
            Api.error(reply, err)
        });
        return $.promise;
    }
};

module.exports = user;