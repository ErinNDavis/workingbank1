const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
//const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3001;

const dbURI = "mongodb://localhost:27017/badbank";
app.use(express.json());

app.use('/api/auth', authRoute);

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", (err)=>{console.error(err)});
db.once("open", () => {console.log("DB started successfully")});

/**app.use('/login', (req, res) => {
  res.send({
    token:'test123'
  });
});*/

app.listen(port, function() {
    console.log("Server runnning on " + port);
  });

module.exports = app; 