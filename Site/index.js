// Make websocket connection to server
let socket = new WebSocket("ws://127.0.0.1:3000");

// Give it a youtube video ID, it'll give you an embed iframe thing
function makeEmbedFromVideoID(ID, autoplay) {
  return ID;

  // Just commented for debugging
  // if (autoplay) {
  //   return (
  //     "<iframe width='560' height='315' src='https://www.youtube.com/embed/" +
  //     ID +
  //     "?autoplay=1'></iframe>"
  //   );
  // } else {
  //   return (
  //     "<iframe width='560' height='315' src='https://www.youtube.com/embed/" +
  //     ID +
  //     "'></iframe>"
  //   );
  // }
}

// When the connection is opened:
socket.onopen = function (e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("Hello");
};

// When the connection errors:
socket.onerror = function (error) {
  console.log(`[error]`);
};

// When the connection recieves a message:
socket.onmessage = function (event) {
  console.log(`Video ID received from server: ${event.data}`);
  console.log(document.querySelector("#urlInput").value);

  document.querySelector("#videoBox").innerHTML = makeEmbedFromVideoID(
    event.data,
    true,
  );
};
