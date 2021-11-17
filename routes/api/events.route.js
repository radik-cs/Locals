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

module.exports = router;