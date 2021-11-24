const express = require("express");
const MongoUtil = require('../../db/MongoUtil')
const ObjectID = require('mongodb').ObjectId;

const router = express.Router();

//add/edit event
router.put("/", (req, res) => {

    let errors = {success:true, message: ""}
    let query = { _id: req.body._id ? new ObjectID(req.body._id) : new ObjectID() }
    console.log(query)
    let update = {
        $set: { 
            host: req.body.host,
            name: req.body.name,
            location: req.body.location,
            datetime: req.body.datetime,
            description: req.body.description
        },
    }
    console.log("request body")
    console.log(req.body)
    console.log("query")
    console.log(query)
    let options = { upsert: true }
    MongoUtil.getDB().collection('events').updateOne(query, update, options).then((result) => {
        console.log("mongo message")
        console.log(result)
        res.send(errors)
    })
});

//get events
router.get("/", (req, res) => {
    let eventsColl = MongoUtil.getDB().collection('events')
    eventsColl.find(req.query).toArray().then(result => {
        res.send(result)
    })
});

module.exports = router;