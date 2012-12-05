var _ = require('underscore');
var links = require('./links');

var crawler = {
    initialize: function (request) {
        this.request = request;
    },

    links: function (url, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        var all = [];
        all.push(url);

        this._extractLinks(url, all, callback);
    },

    _extractLinks: function (url, all, callback) {
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

                all = _.union(all, extracted);
                callback(null, all);
            });
        });
    },

    _extractLinksRecursively: function (url, callback) {
        // var me = this;

        // me._extractLinks(url, function (err, extracted) {


        // });
    }
};

module.exports = crawler;