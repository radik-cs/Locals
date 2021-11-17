const express = require("express");
const MongoUtil = require('../../db/MongoUtil')

const router = express.Router();

router.post("/", async (req, res) => {
    const db = MongoUtil.getDB();
    const events = await db.collection('events')
    console.log("here")
    // check if username exists
    //insert document into database
    const result = await events.insertOne(req.body)
    const errors = {}
    return res.json(errors)
});

router.post("/get-events", async (req, res) => {
    const db = MongoUtil.getDB();
    const events = await db.collection('events')
    console.log("requested user events")
    const username = req.body.username
    let query = {username : `${username}`}
    const result = await events.find(query).toArray()
    console.log(result)
    return res.json(result)
});

module.exports = router;