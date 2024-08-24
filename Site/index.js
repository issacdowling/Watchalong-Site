let socket;

setAllDisconnected(socket);

function serverToggle() {
  if (socket != undefined && socket.readyState == 1) {
    socket.close();
    setAllDisconnected();
    return;
  }

  console.log(
    "Attempting to connect to " + document.querySelector("#urlInput").value,
  );

  try {
    socket = new WebSocket("ws://" + document.querySelector("#urlInput").value);
  } catch {
    setAllFailedConnection("Unknown error");
    return;
  }

  socket.onopen = function (e) {
    setAllConnected();
  };

  socket.onmessage = function (event) {
    console.log(`Video ID received from server: ${event.data}`);

    document.querySelector("#videoBox").innerHTML = makeEmbedFromVideoID(
      event.data,
      true,
    );
  };

  socket.onerror = () => {
    setAllFailedConnection("Unknown error");
  };
}

// Give it a youtube video ID, it'll give you an embed iframe thing
function makeEmbedFromVideoID(ID, autoplay) {
  if (autoplay) {
    return (
      "<iframe width='560' height='315' src='https://www.youtube.com/embed/" +
      ID +
      "?autoplay=1'></iframe>"
    );
  }
}

function setAllDisconnected() {
  console.log("Disconnected from server");
  document.querySelector("#videoBox").innerHTML = "<p>Not connected</p>";
  document.querySelector("#mainButton").innerHTML = "Connect to server";
}

function setAllConnected() {
  console.log("Connected to server");

  document.querySelector("#videoBox").innerHTML =
    "<p>Successfully connected, waiting for video</p>";
  document.querySelector("#mainButton").innerHTML = "Disconnect from server";
}

function setAllFailedConnection(error) {
  console.log("Failed to connect: " + error);
  document.querySelector("#videoBox").innerHTML =
    "<p>Failed to connect to specified server: " + error + "</p>";
}
