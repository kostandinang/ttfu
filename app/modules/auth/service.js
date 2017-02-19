'use strict';

const 
	FBGraph = require('fbgraph'),
	Promise = require('bluebird'),
	Log = require('../../lib/log'),
	Cfg = require('../../config'),
	User = require('../user'),
	Jwt = require('../../lib/jwt'),
	Api = require('../../lib/api'),
	Model = require('./model');

const getUserFromFacebook = (token) => {
	return new Promise((resolve, reject) => {
		let params = {
			fields: 'id,email,name,first_name,last_name,picture.type(large)'
		};
		FBGraph.setAccessToken(token);
		FBGraph.get('me', params, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
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
	return new Promise((resolve, reject) => {
		let tokenData = {
			[User.Model.User.USER_ID]: data[User.Model.User.USER_ID]
		};
		let token = Jwt.generate(tokenData).then(token => {
			resolve(token);
		}).catch(e => {
			reject(e);
		});
	});
};

const respondLogin = (request, reply, data) => {
	getToken(data).then(token => {
		Api.write(reply, {
			[Model._Params.TOKEN]: token,
			data: data,
		});
	}).catch(err => {
		Api.badRequest(reply, err);
	});
};

/**
 * Authenticate via Oauth and receive application token
 * @param request
 * @param reply
 */
const fbAuth = (request, reply) => {
	let fbData = request.auth.credentials;
	if (fbData && fbData.token) {
		let redirectionURL = Cfg.Routes.FB_LOGIN + '?' + Model._Params.FB_TOKEN + '=' + fbData.token;
		Api.redirect(reply, redirectionURL);
	} else {
		Api.badRequest(reply, new Error(Cfg.Errors.FB_AUTH_FAILED))
	}

};

/**
 * Login via fb token and receive application token
 * @param request
 * @param reply
 */
const fbLogin = (request, reply) => {
	let fbToken = request.query[Model._Params.FB_TOKEN];
	getUserFromFacebook(fbToken).then(fbData => {
		let usr = createUserObj(fbData);
		Log.info('User Data from Facebook Graph API', fbData);
		User.Service.findByFacebookId(request, reply, usr).then(res => {
			Log.info('User Data from Database', res);
			`cx`;
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