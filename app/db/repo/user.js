'use strict';

const db = require('../');

const Sql = {
    FIND: 'select * from public.user',
    CREATE: 'insert into public.user(user_id, username, first_name, last_name, photo_url, fb_id, created_at, updated_at) values (default, ${userName}, ${firstName}, ${lastName}, ${photoUrl}, ${fbId}, ${createdAt}, ${updatedAt})',
    ADD_DEVICE: 'insert into public.user_device(user_id, device_id, created_at, active) values (${user_id}, ${device_id}, ${created_at}, ${active});'
};

module.exports = db => {
    return {
        find: () => {
            return db.query(Sql.FIND);
        },
        add: opts => {
            return db.none(Sql.CREATE, opts);
        },
        addDevice: opts => {
            return db.none(Sql.ADD_DEVICE, opts);
        }
    };
};