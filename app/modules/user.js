'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const db = require('../db/');
const Log = require('../lib/log');
const Api = require('../lib/api');
const Models = require('../db/models');
const UserModel = Models.User;
const UserDeviceModel = Models.UserDevice;

const PayloadValidationScheme = {
    payload: {
        device_id: Joi.string().required(),
        user_id: Joi.number().required()
    },
    failAction: Api.paramValidationErr
};

const getUserDataFromFB = fbData => {
    let obj = {};
    obj[UserModel.USERNAME] = fbData.profile.displayName;
    obj[UserModel.FIRST_NAME] = fbData.profile.first;
    obj[UserModel.LAST_NAME] = fbData.profile.last;
    obj[UserModel.PHOTO_URL] = '';
    obj[UserModel.CREATED_AT] = new Date();
    obj[UserModel.UPDATED_AT] = new Date();
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
    Cfg: {
        validate: PayloadValidationScheme
    },
    Actions: {
        add: (request, reply, data) => {
            let userData = getUserDataFromFB(data);
            let $ = Promise.pending();
            db.user.add(userData).then(res => {
                Api.redirect(reply, Cfg.Routes.LOGIN)
            }).catch(err => {
                Api.error(reply, err)
            });
            return $.promise;
        },

        addDevice: (request, reply) => {
            let $ = Promise.pending();
            let userDeviceData = getUserDeviceData(request);
            db.user.addDevice(userDeviceData).then(res => {
                return reply(res);
            }).catch(err => {
                Api.error(reply, err)
            });
            return $.promise;
        }
    }
};