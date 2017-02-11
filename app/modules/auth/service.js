'use strict';

const FBGraph = require('fbgraph');
const Promise = require('bluebird');
const Log = require('../../lib/log');
const Cfg = require('../../config');
const User = require('../user');
const Jwt = require('../../lib/jwt');
const Api = require('../../lib/api');
const Model = require('./model');

const getUserFromFacebook = (token) => {
    let $ = Promise.pending();
    let params = {
        fields: 'id,email,name,first_name,last_name,picture.type(large)'
    };
    FBGraph.setAccessToken(token);
    FBGraph.get('me', params, (err, res) => {
        if (err) {
            $.reject(err);
        } else {
            $.resolve(res);
        }
    });
    return $.promise;
};

const createUserObj = (fb) => {
    return User.Aux.getUserObj({
        username: fb.name,
        email: fb.email,
        firstName: fb.first_name,
        lastName: fb.last_name,
        photoUrl: fb.picture.data.url,
        fbId: fb.id,
    });
};

const getToken = data => {
    let $ = Promise.pending();
    let tokenData = {
        [User.Model.User.USER_ID]: data[User.Model.User.USER_ID]
    };
    let token = Jwt.generate(tokenData).then(token => {
        $.resolve(Jwt.getAuth(token));
    }).catch(e => {
        $.reject(e);
    });
    return $.promise;
};

const respondLogin = (request, reply, data) => {
    getToken(data).then(res => {
        Api.write(reply, {
            [Model._Params.TOKEN]: res.Authorization
        });
    }).catch(err => {
        Api.badRequest(reply, err);
    });
};

//TODO - Implement
let fbAuth = (request, reply) => {
    let data = request.auth.credentials;
};

let fbLogin = (request, reply) => {
    let fbToken = request.query[Model._Params.FB_TOKEN];
    getUserFromFacebook(fbToken).then(fbData => {
        let usr = createUserObj(fbData);
        Log.info('User Data from Facebook Graph API', fbData);
        User.Service.findByFacebookId(request, reply, usr).then(res => {
            Log.info('User Data from Database', res);`cx`
            respondLogin(request, reply, res);
        }).catch(err => {
            User.Service.add(request, reply, usr).then(res => {
                respondLogin(request, reply, usr);
            }).catch(err => {
                Api.badRequest(reply, err);
            })
        });
    }).catch(err => {
        Api.badRequest(reply, err)
    });
};

module.exports = {
    fbLogin: fbLogin,
    fbAuth: fbAuth
};