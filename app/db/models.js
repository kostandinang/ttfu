'use strict';

module.exports = {
    User: {
        USER_ID: 'user_id',
        USERNAME: 'username',
        FIRST_NAME: 'first_name',
        LAST_NAME: 'last_name',
        PHOTO_URL: 'photo_url',
        FB_ID: 'fb_id',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at',
        IS_ADMIN: 'is_admin',
        EMAIL: 'email',
    },
    UserDevice: {
        USER_ID: 'user_id',
        DEVICE_ID: 'device_id',
        CREATED_AT: 'created_at',
        ACTIVE: 'active'
    },
    Match: {
        MATCH_ID: 'match_id',
        DUE_DATE: 'due_date',
        LOCATION: 'location',
        LAT: 'lat',
        LNG: 'lng',
        MAX_PLAYERS: 'max_players',
        MIN_PLAYERS: 'min_players',
        TEAMS: 'teams',
        DELETED_AT: 'deleted_at',
        _Params: {
            FROM: 'from'
        }
    },
};