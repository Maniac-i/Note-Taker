const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const uuid = require('uuid');

allNotesArray = require("./db/db.json");

PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

//Reads db.json file and returns contents as JSON
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {

    if (err) throw err;

    res.send(JSON.parse(data));
  })
});

//Recieves new note and adds it to the db.json file and returns the notes to the client
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    allData = JSON.parse(data);
    let newNote = req.body;
    newNote.id = uuid.v4();

    allData.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(allData), (err) => {
    if (err) throw err;

    res.json(allData);
    })
  })
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    array = JSON.parse(data);
   
    let filter = array.some(obj => obj.id === req.params.id);

    if (filter) {
      filteredNotes = array.filter(note => note.id != req.params.id);
    }

    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) => {
      if (err) throw err;

      res.json(filteredNotes);
    })
  })
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}.`);
})