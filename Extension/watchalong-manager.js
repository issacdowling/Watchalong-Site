console.log("[Watchalong Manager] Loaded");

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

  return url.slice(
    url.indexOf(watchStr) + watchStr.length,
    locationOfAmpersand,
  );
};

// Global state somewhat unideal (currentId) but seems to make everything cleaner in this case
// Also, I wanted to pass in the URL too, but setInterval seems to lock href to whatever it was at page load,
// where including it in this function lets it change.
const checkURLChange = () => {
  let foundId = extractIdFromUrl(document.location.href);
  if (foundId == currentId) {
    return;
  }

  currentId = foundId;
  console.log(
    "[Watchalong Manager] URL CHANGED, found the video ID: " + foundId,
  );
};

// Doesn't seem like the most efficient way to do this, but any other
// ways I found added much more complexity
setInterval(checkURLChange, 1000);
