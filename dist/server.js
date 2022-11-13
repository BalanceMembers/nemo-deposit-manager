#!/usr/bin/env node
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app = require("./app");
const debug = require("debug")("balance-nemo:server");
app.set("port", process.env.PORT);
const server = http_1.default.createServer(app);
server.listen(process.env.PORT);
server.on("listening", () => {
  debug("Listening on " + process.env.PORT);
});
