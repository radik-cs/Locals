const MongoClient = require('mongodb').MongoClient

class MongoUtil {
    static uri = 'mongodb://localhost:27017'
    static db
    static async connectDB() {
        try {
            let client = await MongoClient.connect(this.uri);
            this.db = await client.db('locals')
        }
        catch (err) { return err }
    }
    static async pingDB() {
        try { await this.db.admin().ping() }
        catch (err) { return err }
    }
    static getDB() { return this.db }
    static disconnectDB() { this.db.close() }
}

module.exports = MongoUtil