const Joi = require('joi');
const schema = require('./schema');
const db = require('../database');
const Token = require('../token');

async function isAuthorized(request){
    const {error, value} = Joi.validate(request, schema);

    if (error) return false;

    const password = value.password;
    const user = await db.get()
        .collection('users')
        .findOne({username: value.username});

    return !!user ?  password === user.password : false;
}

async function hasValidRefreshTocken(token) {
    const {username} = Token.getPayload(token);
    const user = await db.get()
        .collection('users')
        .findOne({username: username});
    return !!user ? token === user.refreshToken : false;
} 

module.exports =  { isAuthorized , hasValidRefreshTocken };