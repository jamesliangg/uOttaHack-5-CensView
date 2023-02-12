import {callThisOne} from "./index.js";
import express from 'express';

const app = express();
const port = 3000;
const hostname = '127.0.0.1'

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    let reviewResults = callThisOne(req.query.siteurl);
    console.log(reviewResults);
    reviewResults.then(function(result) {
        console.log(result);
        res.end(JSON.stringify(result));
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:3000/`);
});