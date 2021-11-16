const express = require("express");
const MongoUtil = require('./db/MongoUtil')
const usersRoute = require("./routes/api/users.route");
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

main()

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    // connect to database
    let err = await MongoUtil.connectDB()
    if (err){
        console.log("error connecting to databse")
        throw err
    }else 
        console.log("successfully connected to database")

    //set up api endpoints
    app.use("/api/users", usersRoute);

    //setup up api listener
    app.listen(port, () => console.log(`Web server up and running on port ${port} !`));
}


// mongoUtil.connectDB(async (err) => {
//     if (err) throw err
//     else console.log("Connected to database server")
//     // Routes
//     app.use("/api/users", usersRoute);
//     app.listen(port, () => console.log(`Web server up and running on port ${port} !`));
// })

