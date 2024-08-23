function connectToServer() {
  console.log(
    "Attempting to connect to " + document.querySelector("#urlInput").value,
  );

  let socket;
  try {
    socket = new WebSocket("ws://" + document.querySelector("#urlInput").value);
  } catch {
    console.log("Failed to connect");
    document.querySelector("#videoBox").innerHTML =
      "<p>Failed to connect to specified server</p>";
    return;
  }

  socket.onopen = function (e) {
    console.log("[open] Connection established");
    document.querySelector("#videoBox").innerHTML =
      "<p>Successfully connected, waiting for video</p>";
  };

  socket.onmessage = function (event) {
    console.log(`Video ID received from server: ${event.data}`);

    document.querySelector("#videoBox").innerHTML = makeEmbedFromVideoID(
      event.data,
      true,
    );
  };
}

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
