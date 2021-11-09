const express = require("express");
const mongoUtil = require('./db/mongoUtil')

const app = express();
const port = process.env.PORT || 5000;

mongoUtil.connectDB(async(err) => {
    if (err) throw err
    app.listen(port, () => console.log(`Server up and running on port ${port} !`));
})