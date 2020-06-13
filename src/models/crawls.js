function getCrawl(client, url, callback) {
    // TODO: Rewrite to use promises vs callback

    try {
        // TODO: get the crawl from the database
        client.query('SELECT * FROM crawls where raw_url = $1', [url], function (err, result) {
            if(err) {
                console.log(err);
                callback(null, err);

                return;
            }

            callback(result.rows);
        });
    } catch(e) {
        console.log(e);
        callback(null, e);
    }
}

// TODO: Add createCrawl

module.exports = {
    getCrawl: getCrawl
};