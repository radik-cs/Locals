const express = require("express");
const MongoUtil = require('../../db/MongoUtil')
const ObjectID = require('mongodb').ObjectId;

const router = express.Router();

// add or edit event
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
    let eventsColl = MongoUtil.getDB().collection('events')
    eventsColl.find(req.query).toArray().then(result => {
        res.send(result)
    })
});

module.exports = router;