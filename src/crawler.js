var links = require('./links');

var crawler = {
    initialize: function (request) {
        this.request = request;
        // this.extractor = extractor;
    },

    links: function (url, callback) {
        this.request(url, function (err, response, body) {
            if (err) {
                return callback (err);
            }

            if (response.statusCode !== 200) {
                return callback('request to: ' + url + ' failed. response code: ' + response.statusCode);
            }

            links.extract(body, function (err, extracted) {
                if (err) {
                    return callback('extracting links from ' + url + ' failed.');
                }

                callback(null, extracted);
            });
        });
    }
};

module.exports = crawler;