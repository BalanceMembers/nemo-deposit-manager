#!/usr/bin/env node

import http from "http";

const app = require("./app");
const debug = require("debug")("balance-nemo:server");

app.set("port", process.env.PORT);
const server = http.createServer(app);

server.listen(process.env.PORT);
server.on("listening", () => {
  debug("Listening on " + process.env.PORT);
});
