'use strict';

const Moment = require('moment');

module.exports = {
    getObjValues: obj => {
        return Object.keys(obj).map(e => {
            return obj[e]
        })
    },
    formatDBTime: ts => {
        return Moment(Number.parseFloat(ts)).format('YYYY-MM-DD HH:ss');
    }
};