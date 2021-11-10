const express = require("express");
const mongoUtil = require('./db/mongoUtil')
const usersRoute = require("./routes/api/users");
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoUtil.connectDB(async (err) => {
    if (err) throw err
    else console.log("Connected to database server")
    // Routes
    app.use("/api/users", usersRoute);
    app.listen(port, () => console.log(`Web server up and running on port ${port} !`));
})