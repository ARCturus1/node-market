const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let state = {
    db: null
};

exports.connect = async (url, options = {}) => {
    if (!state.db) {
        try {
            const client = await mongoClient.connect(url, options);
            state.db = client.db();
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