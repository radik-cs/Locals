const express = require("express");
const MongoUtil = require('../../db/MongoUtil')
const router = express.Router();

// @route POST api/users/login
// @desc Sign in user
// @access Public
router.post("/sign-in", async (req, res) => {
    //extract body of request
    let username = req.body.username
    let password = req.body.password


    //validation
    let isValid = username.length > 0 && password.length > 0

    //default errors response object
    let errors = {}
    errors.success = isValid
    errors.message = ""

    if (!errors.success) {
        errors.message = "Password and username cannot be empty."
        return res.json(errors);
    }


    // query databse
    let db = MongoUtil.getDB();
    console.log(username)
    console.log(password)
    let users = await db.collection('users')
    let user = await users.findOne({ username: `${username}` })

    console.log(user)


    //if user does not exist or password is incorrect
    if (!user || user.password != password) {
        errors.success = false;
        errors.message = "Sorry, incorrect password. Please try again."
    }
    return res.json(errors)
});
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/sign-up", async (req, res) => {
    //extract request body
    let username = req.body.username
    let password = req.body.password
    let password2 = req.body.password2

    //validation
    let isValid = username.length > 0 && password.length > 0 && password2.length

    //default errors response object
    let errors = {}
    errors.success = isValid
    errors.message = ""

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
        await users.insertOne({username: `${username}`, password: `${password}`})
    return res.json(errors)
});
module.exports = router;