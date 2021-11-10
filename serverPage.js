const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "./client/build")));
  // All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});