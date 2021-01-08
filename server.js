const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, state) => {
    if (err) throw err;
    
    console.log(state);
    res.json((state));

  })
});

app.post("/api/notes", (req, res) => {
  
});

app.delete("/api/notes/:id", (req, res) => {
  
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}.`);
})