const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://localhost:27017'

var _db

const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, async (err, db) => {
            _db = await db.db('locals')
            return callback(err)
        })

    } catch (err) {
        throw err
    }
}

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }