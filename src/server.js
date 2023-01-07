const express = require("express");
const routes = require("./routes");
var path = require("path");
const { urlencoded } = require("express");

const server = express({ extends: true });

server.use(urlencoded());
server.set("view engine", "ejs");

// Setting directories
server.use(express.static("src/assets"));
server.set("views", path.join(__dirname, "/views"));

server.use(routes);

const port = 3000;
server.listen(port, () => {
  console.log(`Server running`);
  console.log(`http://localhost:${port}/`);
});
