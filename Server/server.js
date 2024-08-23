"use strict";

const serverPort = 3000,
  http = require("http"),
  express = require("express"),
  app = express(),
  server = http.createServer(app),
  WebSocket = require("ws"),
  websocketServer = new WebSocket.Server({ server });

function sendRandomVideo(wsc) {
  let videoIDs = ["MYrfLmm_cT4", "i_mLxyIXpSY", "8mrNEVUuZdk", "OCJYDJXDRHw"];
  let videoID = videoIDs[Math.floor(Math.random() * videoIDs.length)];
  wsc.send(videoID);
  return videoID;
}

//when a websocket connection is established
websocketServer.on("connection", (webSocketClient) => {
  console.log("New connection");
  // Send a video every five seconds
  setInterval(sendRandomVideo, 5000, webSocketClient);

  //when a message is received, echo it
  webSocketClient.on("message", (message) => {
    console.log(message);

    //for each websocket client
    websocketServer.clients.forEach((client) => {
      //send the client the current message
      //client.send(`{ "message" : ${message} }`);
    });
  });
});

//start the web server
server.listen(serverPort, () => {
  console.log(`Websocket server started on port ` + serverPort);
});
