const express = require("express");
const MongoUtil = require('./db/MongoUtil')

//routes
const usersRoute = require("./routes/api/users.route");
const eventsRoute = require("./routes/api/events.route");
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

main()

async function main() {
    // connect to database
    let err = await MongoUtil.connectDB()
    if (err) {
        console.log("error connecting to databse")
        throw err
    } else
        console.log("successfully connected to database")

    //set up api endpoints
    app.use("/api/users", usersRoute);
    app.use("/api/events", eventsRoute);

    //setup up api listener
    app.listen(port, () => console.log(`Web server up and running on port ${port} !`));
}