const express = require("express");
const MongoUtil = require('../../db/MongoUtil')

const router = express.Router();


//add or edit an event
router.put("/", (req, res) => {
    let errors = {success: true, message : ""}
    let eventsColl = MongoUtil.getDB().collection('events')
    eventsColl.insertOne(req.body).then(() => {
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