console.log("Watchalong extension loaded");

let url = document.location.href;
let watchStr = "watch?v=";
let videoId = url.slice(url.indexOf(watchStr) + watchStr.length);

console.log("Watchalong extension found the video ID: " + videoId);
