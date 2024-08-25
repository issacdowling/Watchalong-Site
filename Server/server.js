"use strict";

const port = 8080,
  express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  server = app.listen(port),
  WebSocket = require("ws"),
  websocketServer = new WebSocket.Server({ noServer: true }),
  submitSecret =
    process.env.SUBMIT_SECRET == undefined
      ? "changeMe"
      : process.env.SUBMIT_SECRET;

if (submitSecret == "changeMe") {
  console.log(
    "Running with the default submit secret of 'changeMe', you should change this!",
  );
}

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
  if (typeof request.body != typeof "") {
    console.log("Received bad request");
    response.status(400).send("Bad request");
    return;
  }
  if (!request.body.startsWith(submitSecret)) {
    console.log("Received unauthorised request");
    response.status(401).send("Unauthorised");
    return;
  }
  let receivedId = request.body.slice(submitSecret.length);
  console.log("Received video ID: " + receivedId);
  response.status(200).send(receivedId);
  currentId = receivedId;
  clients.forEach((client) => {
    client.send(receivedId);
  });
});

console.log(`Server started on port ` + port);
server.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (socket) => {
    websocketServer.emit("connection", socket, request);
  });
});
