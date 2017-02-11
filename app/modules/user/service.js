'use strict';

const Promise = require('bluebird');
const DB = require('../../db');
const Api = require('../../lib/api');
const Cfg = require('../../config');
const Repo = require('./repo')(DB);
const Models = require('./model');
const UserModel = Models.User;
const UserDeviceModel = Models.UserDevice;

const getUserDeviceData = req => {
    return {
        [UserDeviceModel.USER_ID]: req.payload[UserDeviceModel.USER_ID],
        [UserDeviceModel.DEVICE_ID]: req.payload[UserDeviceModel.DEVICE_ID],
        [UserDeviceModel.CREATED_AT]: new Date(),
        [UserDeviceModel.ACTIVE]: true
    };
};

module.exports = {
    findByFacebookId: (request, reply, data) => {
        let $ = Promise.pending();
        Repo.findByFacebookId(data).then(res => {
            $.resolve(res);
        }).catch(err => {
            $.reject(err);
        });
        return $.promise;
    }, 
    add: (request, reply, data) => {
        let $ = Promise.pending();
        Repo.add(data).then(res => {
            $.resolve(res);
        }).catch(err => {
            $.reject(err);
        });
        return $.promise;
    },
    addDevice: (request, reply) => {
        let $ = Promise.pending();
        let userDeviceData = getUserDeviceData(request);
        Repo.addDevice(userDeviceData).then(res => {
            Api.write(reply, res);
        }).catch(err => {
            Api.badRequest(reply, err);
        });
        return $.promise;
    }
};