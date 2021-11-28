const express = require("express");
const MongoUtil = require('../../db/MongoUtil')
const ObjectID = require('mongodb').ObjectID;
const qr = require('qrcode')

const router = express.Router();

// add or update event
//maybe create a call back for the event's date that triggers the generation of all the qr codes.
//TODO - need to clean this up for god's sake.
router.put("/", (req, res) => {
    let errors = { success: true, message: "" }
    let query = { _id: undefined }
    let update = {
        $set: {
            host: req.body.event.host,
            name: req.body.event.name,
            location: req.body.event.location,
            startDateTime: new Date(req.body.event.startDateTime),
            endDateTime: new Date(req.body.event.endDateTime),
            description: req.body.event.description,
        }
    }
    if (req.body.event._id) {
        query._id = new ObjectID(req.body.event._id)
        if (req.body.guest) {
            // we are adding a guest to the RSVP list, need to possibly generate a QR code, idk
            update.$push = { RSVPs: req.body.guest }
            let query1 = { username: req.body.guest }
            let update1 = { $push: { RSVPs: ObjectID(req.body.event._id) } }
            MongoUtil.getDB().collection('users').updateOne(query1, update1, { upsert: false }).then((result) => {
            })
        }
    } else {
        query._id = new ObjectID()
        update.$set.RSVPs = []
    }
    let options = { upsert: true }
    MongoUtil.getDB().collection('events').updateOne(query, update, options).then((result) => {
        res.send(errors)
    })
});

// get events
router.get("/", (req, res) => {
    let query = req.query.search ? { name: req.query.search } : req.query
    MongoUtil.getDB().collection('events').find(query).toArray().then(result => {
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

router.get("/:id", (req, res) => {
    const [event_id, guest_username] = req.params.id.split("-")

    let query = { _id: ObjectID(event_id), RSVPs: `${guest_username}` }
    let update = { $pull: { RSVPs: `${guest_username}` } }
    let options = { upsert : false}
    MongoUtil.getDB().collection('events').updateOne(query, update, options).then(result => {
        if (result.matchedCount == 1 && result.modifiedCount == 1){
            let query = { username: `${guest_username}`}
            let update =  { $pull: { RSVPs: `${ObjectID(event_id)}` } }
            let options = {upsert : false}
            MongoUtil.getDB().collection('users').updateOne(query, update, options).then(result => {
                res.send("guest successfully checked in")
            })
        }
        else{
            res.send("QR code invalid")
        }
    })
})

module.exports = router