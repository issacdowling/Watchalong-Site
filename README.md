# watchalong-site
Intended to allow sharing music with live viewers without actually streaming copyrighted material. Streamer could have a web server just sharing and autoplaying Youtube URLs on viewers' computers, meaning they're getting from the music from an official source, and making the music optional.

# How to use:

## Changing the secret
To prevent random people from changing the video being shown, you - as the owner of the server - will have a secret key that's sent along with the video ID to prove that you should be allowed to change it. You don't have to think about this while using it (the extension sends the video and your key automatically), but you do need to set it once.

If you're on Linux and want a random key, just run (where the provided number is the size in bytes)
```
openssl rand --base64 32
```
to get a large random string. You can pick any string you want though, with the understanding that - if this was correctly guessed by somebody else - they could change the video that's being played.

Later, when you run the server, you'll run it by `cd`'ing into the `Server` directory and running
```sh
SUBMIT_SECRET=yoursecrethere node server.js
```

For the extension, however, it doesn't yet support dynamically setting this secret, so you must open the `Extension/watchalong-manager.js` file, and modify
```javascript
const HARDCODED_SUBMIT_SECRET = "changeMe";
```
to be
```javascript
const HARDCODED_SUBMIT_SECRET = "yoursecrethere";
```

You're now done with the secret.

## The extension
In ./Extension, there's a browser extension which watches for you loading a Youtube video and sends it to your server for later relaying to viewers.

You likely don't want this installed 24/7, as it would always be publishing every video you watch to that server. For this reason, you should take advantage of Firefox and Chromium's ability to load temporary extensions.

### Chrome
Go to `chrome://extensions`, enable developer mode in the top right, then click `Load unpacked` in the top left. From the file picker that's opened, just go to the `Extension` directory and select it. You've now got the extension running.

### Firefox
Go to `about:debugging`, `This Firefox`, `Load Temporary Add-on`, and select one file from _within_ the Extension folder, rather than the folder itself. You've now got the extension running.

## The server
As mentioned earlier, you just need to run
```sh
SUBMIT_SECRET=yoursecrethere node server.js
```
while in the `Server` directory to get the server running. It runs on port `8080` by default.

# Why is the formatting weird?
I'm just using the default Typescript formatter (despite this being a JS project) thanks to [Zed's](https://github.com/zed-industries/zed) defaults. All I wanted was some kind of formatting, I don't mind the details (despite that meaning that it's kind of weird-looking)
