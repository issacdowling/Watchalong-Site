console.log("[Watchalong Manager] Loaded");

const host = "127.0.0.1",
  port = 8080,
  path = "/submit",
  secure = false;

// TODO: Make this not hardcoded
const HARDCODED_SUBMIT_SECRET = "changeMe";

let currentId;

const extractIdFromUrl = (url) => {
  let watchStr = "watch?v=";

  // I'm operating under the assumption that the & symbol won't appear in video IDs,
  // since that's how they separate other query parameters.
  // Checking for (and ending at) an & means allowing this to work with playlists.
  let locationOfAmpersand = url.indexOf("&");
  if (locationOfAmpersand == -1) {
    locationOfAmpersand = url.length;
  }

  let id = url.slice(
    url.indexOf(watchStr) + watchStr.length,
    locationOfAmpersand,
  );
  // This is needed since the script seems to stay loaded when navigating away
  // from the watch page, so we need to make sure that /results pages arent'
  // interpreted as IDs.
  if (id.includes("youtube.com")) {
    return "NONE";
  }
  return id;
};

// Global state somewhat unideal (currentId) but seems to make everything cleaner in this case
// Also, I wanted to pass in the URL too, but setInterval seems to lock href to whatever it was at page load,
// where including it in this function lets it change.
const checkURLChange = async () => {
  let foundId = extractIdFromUrl(document.location.href);
  if (foundId == currentId) {
    return;
  }
  currentId = foundId;

  fetch(secure ? "https://" : "http://" + host + ":" + port + path, {
    method: "post",
    headers: {
      "content-type": "text/plain",
    },
    mode: "no-cors",
    body: HARDCODED_SUBMIT_SECRET + currentId,
  });

  console.log(
    "[Watchalong Manager] URL CHANGED, found the video ID: " + foundId,
  );
};

// Doesn't seem like the most efficient way to do this, but any other
// ways I found added much more complexity
setInterval(checkURLChange, 1000);
