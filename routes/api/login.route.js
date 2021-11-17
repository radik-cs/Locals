const express = require("express");
const MongoUtil = require('../../db/MongoUtil')

//validation functions
const validateSignInInput = require("../../validation/signin.validator");
const validateSignUpInput = require("../../validation/signup.validator");

const router = express.Router();

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/sign-in", async (req, res) => {
    //validate
    let { errors, isValid } = validateSignInInput(req.body);
    errors['success'] = isValid
    if (!isValid)
        return res.json(errors);
    //extract request body
    let username = req.body.username;
    let password = req.body.password;

    // query databse
    let query = {username:`${username}`}
    let db = MongoUtil.getDB();
    let users = await db.collection('users')
    let user = await users.findOne({ username: `${username}` })

    //validate username exists and password is correct
    //dont tell the client if the user does not exist
    if (!user || user.password != password){
        errors.success = false;
        errors.password = "Incorrect password"
    }
    return res.json(errors)
});
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/sign-up", async (req, res) => {
    // Form validation
    let { errors, isValid } = validateSignUpInput(req.body);
    errors["success"] = isValid
    if (!isValid)
        return res.json(errors);
    //extract request body
    let username = req.body.username;
    let password = req.body.password;

    // query databse
    let query = {username:`${username}`}
    let db = MongoUtil.getDB();
    let users = await db.collection('users')
    let user = await users.findOne({ username: `${username}` })

    if (user) {
        errors.username = "Username taken"
        errors.success = false
        return res.json(errors)
    }
    //insert document into database
    await users.insertOne(req.body)
    return res.json(errors)
});

module.exports = router;