"use strict";

const wsPort = 5000,
  express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  server = app.listen(wsPort),
  WebSocket = require("ws"),
  websocketServer = new WebSocket.Server({ noServer: true });

let clients = [];

// TODO: Remove client on disconnect
websocketServer.on("connection", (webSocketClient) => {
  console.log("New connection");
  clients.push(webSocketClient);
});

app.use(bodyParser.text());

app.post("/submit", (request, response) => {
  console.log("Received video ID: " + request.body);
  response.send(request.body);
  clients.forEach((client) => {
    client.send(request.body);
  });
});

console.log(`Websocket server started on port ` + wsPort);
server.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (socket) => {
    websocketServer.emit("connection", socket, request);
  });
});
