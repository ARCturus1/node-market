//const mongo = require('koa-mongo');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let state = {
    db: null
};

exports.connect = async function (url, name, options = {}) {
    if (!state.db) {
        try {
            const client = await mongoClient.connect(url);
            state.db = client.db();
            // const a = await state.db.collection('users').find().toArray();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.get = function () {
    return state.db;
};
exports.ObjectId = () => ObjectId;