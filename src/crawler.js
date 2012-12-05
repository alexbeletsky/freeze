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

        this._extracted = [url];
        this._extractLinks(url, callback);
    },

    _extractLinks: function (url, callback) {
        var _extracted = this._extracted;

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

                _extracted = _.union(_extracted, extracted);
                callback(null, _extracted);
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