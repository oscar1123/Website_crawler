const express = require('express');
const app = express();
const port = parseInt(process.env.EXPOSED_PORT);
const fs = require('fs');
const { Client } = require('pg');
const axios = require('axios');
const cheerio = require('cheerio');
const crawls = require('./models/crawls');

app.use(express.urlencoded({ extended: true }));

const client = new Client({
    connectionString: "postgres://root:pass@postgres:5432/scraper"
});
client.connect();

//serve html page
app.get('/', function (req, res) {
    fs.readFile("./index.html", function(err, data) {
        if (err) {
            res.writeHead(404);
            res.write("Not found");
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
});

app.post('/crawl', function (req, res) {
    crawls.getCrawl(client, 'https://stackoverflow.com', function(data, err) {
        if(err) {
            // Something went wrong!
            console.log(err);
            return;
        }

        // Send back the data in JSON format
        res.send(JSON.stringify(data));
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))