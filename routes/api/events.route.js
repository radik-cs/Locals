
const express = require("express");
const MongoUtil = require('../../db/MongoUtil')

const router = express.Router();

router.post("/", async (req, res) => {
    //validate event format
    let errors = {}
    errors.success = true;
    //query database
    const db = MongoUtil.getDB();
    const events = await db.collection('events');
    //should check if there username exists here
    const result = await events.insertOne(req.body)
    return res.json(errors)
});

router.post("/get-events", async (req, res) => {
    const db = MongoUtil.getDB();
    const events = await db.collection('events')
    const username = req.body.username
    let query = { username: `${username}` }
    const result = await events.find(query).toArray()
    return res.json(result)
});

module.exports = router;