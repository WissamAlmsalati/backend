const express = require("express");
const router = express.Router();

const Note=require("../moudels/notes");

router.post("/list", async function (req, res) {
    var notes = await Note.find({userid: req.body.userid});
    res.json(notes);
});


router.get("/list/:userid", async function (req, res) {

    var notes = await Note.find({
        userid: req.params.userid
    });
    res.json(notes);
});

//add note methode

router.post("/add", async function (req, res) {

    await Note.deleteOne({ id: req.body.id })

    const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content, // corrected typo here
    });

    try {
        await newNote.save();
        const response = { message: "New Note Created!" + req.body.id };
        res.json(response);
        console.log("Note Added"); // moved console.log here
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//delete note methode

router.post("/delete", async function (req, res) {
    await Note.deleteOne({ id: req.body.id });
    const response = { message: "Note Deleted!" + req.body.id };
    res.json(response);
    console.log("Note Deleted");
});


module.exports = router;