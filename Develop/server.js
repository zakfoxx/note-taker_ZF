let express = require("express");
let server = express();
let fs = require("fs");
let path = require("path");
let PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));

server.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

server.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
