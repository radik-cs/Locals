const express = require("express");
const MongoUtil = require('../../db/MongoUtil')

//validation functions
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

const router = express.Router();

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
    //validate
    const { errors, isValid } = validateLoginInput(req.body);
    errors['success'] = isValid
    if (!isValid)
        return res.json(errors);

    // connnect to database
    const db = MongoUtil.getDB();
    const users = await db.collection('users')

    const username = req.body.username;
    const password = req.body.password;

    //check that the informations is in the database
    var user = await users.findOne({ username: `${username}` })
    if (!user)
        return res.json({ message: "Username not found", success: false });
    if (user.password != password)
        return res.json({ message: "Password incorrect", success: false });
    return res.json({ success: true })
});
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    errors["sucess"] = isValid
    if (!isValid)
        return res.json(errors);
    // connnect to database
    const db = MongoUtil.getDB();
    const users = await db.collection('users')
    // check if username exists
    const username = req.body.username
    var user = await users.findOne({ username: `${username}` })
    if (user) {
        errors.username = "Username taken"
        errors.sucess = false
        return res.json(errors)
    }
    //insert document into database
    const result = await users.insertOne(req.body)
    console.log(result)
    return res.json(errors)
});

module.exports = router;