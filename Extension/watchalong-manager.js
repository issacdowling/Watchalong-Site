console.log("Watchalong extension loaded");

let url = document.location.href;
let watchStr = "watch?v=";

// I'm operating under the assumption that the & symbol won't appear in video IDs,
// since that's how they separate other query parameters.
// Checking for (and ending at) an & means allowing this to work with playlists.
let locationOfAmpersand = url.indexOf("&");
if (locationOfAmpersand == -1) {
  locationOfAmpersand = url.length;
}

let videoId = url.slice(
  url.indexOf(watchStr) + watchStr.length,
  locationOfAmpersand,
);

console.log("Watchalong extension found the video ID: " + videoId);
