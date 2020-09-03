var express = require("express");
var fs = require("fs");
var notes = require("./db/db.json");
var path =  require("path")
const { v4: uuidv4 } = require('uuid');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// // Sets up the Express app to handle data parsing
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());
 app.use(express.static('public'))

// Data
// ==================================================================

function saveNotes(res) {
    fs.writeFile("./db/db.json", JSON.stringify(notes),
        err => {
            if (err) throw err;
        })
    res.sendStatus(200)
}

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.json(notes)
});

app.post("/api/notes", function (req, res) {
    console.log('body is ',req.body);
    var newNote = req.body
    newNote.id = uuidv4()
    notes.push(newNote)
    saveNotes(res)
});

 app.delete('/api/notes/:id', function (req, res) {
    console.log("Note deleted " + req.params.id);
//     var deleteNote = req.body
//     deleteNote.id = uuidv4()
//     notes.delete(deleteNote)
//     saveNotes(res)

  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
