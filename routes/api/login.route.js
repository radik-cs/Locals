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
            usersColl.insertOne({ username: `${username}`, password: `${password}`, RSVPs: [] })
        res.send(errors)
    })
});

module.exports = router;