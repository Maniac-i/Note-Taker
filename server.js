const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

//Reads db.json file and returns contents as JSON
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {

    if (err) throw err;

    res.json((data));
  })
});

//Recieves new note and adds it to the db.json file and returns the notes to the client
app.post("/api/notes", (req, res) => {
  let newNote = JSON.stringify(req.body);
  fs.appendFile("./db/db.json", newNote, (err) => {
    if (err) throw err;

    res.json(newNote);
  })

});

app.delete("/api/notes/:id", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}.`);
})