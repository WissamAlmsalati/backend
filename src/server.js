//Initilaize the server
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Note = require("./moudels/notes");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MongoDBPathh = "mongodb+srv://wissamAl:00000000@cluster.aojxrsr.mongodb.net/?retryWrites=true&w=majorits";
mongoose.connect(MongoDBPathh).then(function () {
    app.get("/", function (req, res) {
       const response = {statuscode:res.statusCode,  message: ' API work' };
        res.json(response);
    });
    const noteRouter=require("./routes/Note");
    app.use("/notes",noteRouter);
}).then(console.log("Connected to DB")).catch(function (err) {
    console.log(err);
});

const PORT = process.env.PORT || 5000;
//start the server in this port
app.listen(PORT, function () {
    console.log("Server started on PORT: 5000");
});
