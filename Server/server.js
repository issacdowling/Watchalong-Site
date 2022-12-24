"use strict";

const serverPort = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {

    // Send the video ID
    webSocketClient.send("MYrfLmm_cT4")
    
    //when a message is received, echo it
    webSocketClient.on('message', (message) => {

        console.log(message)

        //for each websocket client
        websocketServer
        .clients
        .forEach( client => {
            //send the client the current message
            client.send(`{ "message" : ${message} }`);
        });
    });
});

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});