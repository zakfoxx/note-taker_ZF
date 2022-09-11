let express = require("express");
let server = express();
let fs = require("fs");
let path = require("path");
const { runInNewContext } = require("vm");
let PORT = process.env.PORT || 3000;
let newID = require("uniqid");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));

server.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

server.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (error, notes) => {
    res.send(notes);
  });
});

server.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});

server.post("/api/notes", (req, res) => {
  req.body.id = newID();
  fs.readFile("./db/db.json", "utf-8", (error, notes) => {
    let notesFile = JSON.parse(notes);
    notesFile.push(req.body);
    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(notesFile, null, 2)
    );
    res.send(notesFile);
  });
});

server.delete("/api/notes/:id", (req, res) => {
  let noteDelete = req.params.id.replace(":", "");
  fs.readFile("./db/db.json", "utf-8", (error, notes) => {
    let notesFile = JSON.parse(notes);
    let allNotes = notesFile.filter((note) => noteDelete !== note.id);
    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(allNotes, null, 2)
    );
    res.send(allNotes);
  });
});
