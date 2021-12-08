const express = require("express");
const MongoUtil = require('../../db/MongoUtil')
const ObjectID = require('mongodb').ObjectID;
const qr = require('qrcode')

const router = express.Router();

// add or update event - could clean this up
router.put("/", (req, res) => {
    const { host, name, location, startDateTime, endDateTime, description, _id, guest, RSVPs, updateRSVPList } = req.body
    let update = {
        $set: {
            host,
            name,
            location,
            startDateTime: new Date(startDateTime),
            endDateTime: new Date(endDateTime),
            description
        }
    }
    let query = {}
    if (updateRSVPList && _id) { // the host is adding/removing guests from an existing event
        query._id = new ObjectID(_id)
        update.$set.RSVPs = RSVPs
    }
    else if (!updateRSVPList && _id) { //a guest has RSVP'd to an event
        query._id = new ObjectID(_id)
        if (guest) {
            update.$push = { RSVPs: guest }
            // add host of event to recomended hosts
            MongoUtil.getDB().collection("users").updateOne({ username: `${guest}` }, { $push: { recs: `${host}` } }).then(result => {
                //added rec
            })
        }
    }
    else if(updateRSVPList && !_id){ //we are creating an event with an RSVP list
        update.$set._id = new ObjectID()
        query._id = update.$set._id
        update.$set.RSVPs = RSVPs
    }
    else { // we are creating an event with no RSVP list
        update.$set._id = new ObjectID()
        query._id = update.$set._id
        update.$set.RSVPs = []  
    }
    let options = { upsert: true }
    MongoUtil.getDB().collection("events").updateOne(query, update, options).then(result => {
        res.send()
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
    let query = { _id: new ObjectID(req.query._id) }
    MongoUtil.getDB().collection('events').deleteOne(query).then(result => {
        res.send(result)
    })
})

//qr code verification
router.get("/:id", (req, res) => {
    const [event_id, guest_username] = req.params.id.split("-")
    let query = { _id: new ObjectID(event_id), RSVPs: `${guest_username}` }
    let update = { $pull: { RSVPs: `${guest_username}` } }
    let options = { upsert: false }
    MongoUtil.getDB().collection('events').updateOne(query, update, options).then(result => {
        if (result.matchedCount == 1 && result.modifiedCount == 1) {
            res.send(`Welcome ${guest_usernae}!`)
        }
        else {
            res.send("QR code invalid")
        }
    })
})

module.exports = router