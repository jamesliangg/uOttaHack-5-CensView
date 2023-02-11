import {callThisOne} from "./index.js";
import http from "http";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    let reviewResults = callThisOne('https://www.bestbuy.ca/en-ca/product/sonos-arc-sound-bar-black/14597172');
    console.log(reviewResults);
    reviewResults.then(function(result) {
        console.log(result);
        res.end(result.toString());
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});