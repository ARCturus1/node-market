const jwt = require('jsonwebtoken');
const db = require('./database');
const key = require('./config').key;

async function generateTokens(username) {
    const accessToken = jwt.sign({ username }, key, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ username }, key, { expiresIn: '30d' });
    const tokens = {
        accessToken,
        refreshToken,
        expiresIn: jwt.decode(accessToken).exp
    };

    await db.get()
        .collection('users')
        .updateOne({username: username}, {$set : { 
            accessToken,
            refreshToken
        }});
    return tokens;
}

function getPayload(token){
    try{
        const payload = jwt.verify(token, key);
        return payload;
    } catch (error) {
        console.error('Cannot verify tocken', token);
    }
    return {};
}

module.exports = { generateTokens , getPayload };