const express = require("express");
const mongoUtil = require('../../db/mongoUtil')
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
    const db = mongoUtil.getDB();
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
    // Check validation
    errors['success'] = isValid
    if (!isValid)
        return res.json(errors);
    // connnect to database
    const db = mongoUtil.getDB();
    const users = await db.collection('users')
    // check if username exists
    const username = req.body.username
    var user = await users.findOne({ username: `${username}` })
    if (user)
        return res.json({ message: "Username taken", success: false });
    //insert document into database
    const result = await users.insertOne(req.body)
    return res.json({ success: true })
});
module.exports = router;