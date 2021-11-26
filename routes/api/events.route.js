const express = require("express");
const MongoUtil = require('../../db/MongoUtil')
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

// add or update event
router.put("/", (req, res) => {
    let errors = { success: true, message: "" }

    let query = { _id: req.body._id ? new ObjectID(req.body._id) : new ObjectID() }
    let update = {
        $set: {
            host: req.body.host,
            name: req.body.name,
            location: req.body.location,
            datetime: req.body.datetime,
            description: req.body.description
        },
    }
    let options = { upsert: true }
    MongoUtil.getDB().collection('events').updateOne(query, update, options).then((result) => {
        res.send(errors)
    })
});

// get events
router.get("/", (req, res) => {
    MongoUtil.getDB().collection('events').find(req.query).toArray().then(result => {
        res.send(result)
    })
});

//delete event
router.delete("/", (req, res) => {
    let query = { _id: ObjectID(req.query._id) }
    MongoUtil.getDB().collection('events').deleteOne(query).then(result => {
        res.send(result)
    })
})

module.exports = router