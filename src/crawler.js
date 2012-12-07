var _ = require('underscore');
var links = require('./links');
var urls = require('./urls');

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

        var extractedUrls = [url];
        function _callback(err, extracted) {
            if (err) {
                return callback(err);
            }

            extractedUrls = extractedUrls.concat(extracted);
            callback(null, extractedUrls);
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

    _extractLinksRecursively: function (targetUrl, callback) {
        var me = this;
        var toCrawl = [targetUrl];
        var memo = [];

        (function _extract() {
            var url = toCrawl.pop();
            if (url) {
                me._extractLinks(url, function (err, extracted) {
                    if (err) {
                        return callback('extracting links from ' + url + ' failed.');
                    }


                    extracted = _.map(extracted, function (e) {
                        return urls.qualify(me.root, e);
                    });

                    toCrawl = _.union(toCrawl, extracted);
                    memo = _.union(memo, toCrawl);

                    _extract();
                });
            } else {
                callback(null, memo);
            }
        })();

        // var url = toCrawl.pop();
        // if (url) {
        //     extract(url, function (err, extracted) {
        //         if (err) {
        //             callback(err);
        //         }


        //     });
        // } else {
        //     callback(null, memo);
        // }




        // function extract(url, callback) {
        //     me._extractLinks(url, function (err, extracted) {
        //         if (err) {
        //             return callback('extracting links from ' + url + ' failed.');
        //         }

        //         if (extracted.length === 0) {
        //             return callback(null, memo);
        //         }

        //         memo = memo.concat(extracted);

        //         // _.each(extracted, function (url) {
        //         //     url = urls.qualify(me.root, url);
        //         //     extract(url, callback);
        //         // });
        //     });
        // };
    }
};

module.exports = crawler;