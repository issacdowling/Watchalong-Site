"use strict";

const port = 8080,
  express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  server = app.listen(port),
  WebSocket = require("ws"),
  websocketServer = new WebSocket.Server({ noServer: true });

let clients = [];
let currentId = "";

// TODO: Remove client on disconnect
websocketServer.on("connection", (webSocketClient) => {
  console.log("New connection");
  clients.push(webSocketClient);

  // This won't bring the client to the right _part_ of the video, but
  // does allow new visitors to get a video immediately rather than nothing.
  if (currentId != "") {
    webSocketClient.send(currentId);
  }
});

app.disable("x-powered-by");
app.set("etag", false);
app.use(bodyParser.text());
app.use((request, response, next) => {
  response.removeHeader("Date");
  response.removeHeader("Connection");
  response.removeHeader("Keep-Alive");
  next();
});

app.use("/", express.static("Site"));

app.post("/submit", (request, response) => {
  console.log("Received video ID: " + request.body);
  response.send(request.body);
  currentId = request.body;
  clients.forEach((client) => {
    client.send(request.body);
  });
});

console.log(`Server started on port ` + port);
server.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (socket) => {
    websocketServer.emit("connection", socket, request);
  });
});
