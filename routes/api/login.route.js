const express = require("express");
const MongoUtil = require('../../db/MongoUtil')

const router = express.Router();

// signin
router.get("/", (req, res) => {
    let errors = { success: true, message: "" }
    let usersColl = MongoUtil.getDB().collection('users');
    usersColl.findOne(req.query).then(user => {
        if (!user || user.password != req.query.password) {
            errors.success = false;
            errors.message = "Sorry, incorrect password. Please try again."
        }
        res.send(errors)
    })
});

//signup
router.post("/", (req, res) => {
    let errors = { success: true, message: "" }

    let username = req.body.username
    let password = req.body.password
    let password2 = req.body.password2

    let usersColl = MongoUtil.getDB().collection('users')
    usersColl.findOne({ username: `${username}` }).then(user => {
        if (user) {
            errors.message = "Username taken, please choose a different one."
            errors.success = false
        } else
            usersColl.insertOne({ username: `${username}`, password: `${password}`, recs: []})
        res.send(errors)
    })
});

// signin
router.get("/recommendations", (req, res) => {
    MongoUtil.getDB().collection('users').findOne(req.query).then(user => {
        // let emptyArray = []
        // if (user.recs.length == 0) 
        //     res.send([])
        //get events where
        // 1. host is in the user's recomendations
        // 2. the user has not already RSVP'd
        let query = {
            RSVPs : {$not: {$eq: user.username}},
            host: {$in: user.recs}
        }   
        MongoUtil.getDB().collection('events').find(query).toArray().then(result => {
            res.send(result)
        })
    })
});


module.exports = router;