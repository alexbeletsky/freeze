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

        this.root = url;
        options.recursive ? this._extractLinksRecursively(url, _callback) : this._extractLinks(url, _callback);

        var urls = [url];
        function _callback(err, extracted) {
            urls = urls.concat(extracted);
            callback(null, urls);
        }

    },

    _extractLinks: function (url, callback) {
        var me = this;
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
    },

    _extractLinksRecursively: function (url, callback) {
        var me = this;
        var memo = [];

        (function extract(url, callback) {
            me._extractLinks(url, function (err, extracted) {
                if (err) {
                    return callback('extracting links from ' + url + ' failed.');
                }

                memo = memo.concat(extracted);
                if (extracted.length === 0) {
                    return callback(null, memo);
                }

                _.each(extracted, function (url) {
                    url = me.root + '/' + url;
                    extract(url, callback);
                });
            });
        })(url, callback);
    }
};

module.exports = crawler;