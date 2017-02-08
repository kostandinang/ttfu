'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const DB = require('../../db');
const Api = require('../../lib/api');
const Cfg = require('../../config');
const Models = require('./model');
const UserModel = Models.User;
const UserDeviceModel = Models.UserDevice;

const Repo = require('./repo')(DB);

const PayloadValidationScheme = {
    payload: {
        device_id: Joi.string().required(),
        user_id: Joi.number().required()
    },
    failAction: Api.invalidParams
};

const getUserDataFromFB = fbData => {
    let obj = {};
    obj[UserModel.USER_ID] = 'default';
    obj[UserModel.USERNAME] = fbData.profile.displayName;
    obj[UserModel.EMAIL] = fbData.profile.email;
    obj[UserModel.FIRST_NAME] = fbData.profile.name.first;
    obj[UserModel.LAST_NAME] = fbData.profile.name.last;
    obj[UserModel.PHOTO_URL] = '';
    obj[UserModel.FB_ID] = fbData.profile.id;
    obj[UserModel.CREATED_AT] = new Date();
    obj[UserModel.UPDATED_AT] = new Date();
    obj[UserModel.IS_ADMIN] = false;
    return obj;
};

const getUserDeviceData = req => {
    let obj = {};
    obj[UserDeviceModel.USER_ID] = req.payload[UserDeviceModel.USER_ID];
    obj[UserDeviceModel.DEVICE_ID] = req.payload[UserDeviceModel.DEVICE_ID];
    obj[UserDeviceModel.CREATED_AT] = new Date();
    obj[UserDeviceModel.ACTIVE] = true;
    return obj;
};

module.exports = {
    add: (request, reply, data) => {
        let userData = getUserDataFromFB(data);
        let $ = Promise.pending();
        Repo.add(userData).then(res => {
            Api.redirect(reply, Cfg.Routes.LOGIN)
        }).catch(err => {
            Api.badRequest(reply, err);
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