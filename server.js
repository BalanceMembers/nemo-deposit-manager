#!/usr/bin/env node

const app = require("./app");
const debug = require("debug")("balance-nemo:server");
const http = require("http");
app.set("port", process.env.PORT);

const server = http.createServer(app);
server.listen(process.env.PORT);
server.on("listening", () => {
  debug("Listening on " + process.env.PORT);
});
