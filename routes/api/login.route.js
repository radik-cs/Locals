const express = require("express");
const MongoUtil = require('../../db/MongoUtil')
const router = express.Router();

// signin
router.get("/", async (req, res) => {
    console.log(req)
    let errors = { success: true, message: "" }
    let usersColl = MongoUtil.getDB().collection('users');
    let user = await usersColl.findOne(req.query).then(user => {
        if (!user || user.password != req.query.password) {
            errors.success = false;
            errors.message = "Sorry, incorrect password. Please try again."
        }
        res.send(errors)
    })
});


//signup
router.put("/sign-up", async (req, res) => {
    //errors response object
    let errors = {}
    errors.message = ""

    //extract request body
    let username = req.body.username
    let password = req.body.password
    let password2 = req.body.password2

    //validation
    errors.success = username.length > 0 && password.length > 0 && password2.length
    if (!errors.success) {
        errors.message = "Username, Passsword, and Re-Entered password cannot be empty."
        return res.json(errors)
    }

    // query databse
    let db = MongoUtil.getDB();
    let users = await db.collection('users')
    let user = await users.findOne({ username: `${username}` })

    //if a user with the username exists
    if (user) {
        errors.message = "Username taken, please choose a different one."
        errors.success = false
    } else
        await users.insertOne({ username: `${username}`, password: `${password}` })
    return res.json(errors)
});
module.exports = router;