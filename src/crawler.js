var _ = require('underscore');
var links = require('./links');
var urls = require('./urls');

var crawler = {
    initialize: function (request) {
        _.bindAll(this);

        this.request = request;
    },

    links: function (url, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        this.root = url;
        this.options = options;

        this.options.recursive ? this._extractLinksRecursively(url, _callback) : this._extractLinks(url, _callback);

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

                extracted = _.map(extracted, qualify);

                me._log('processsed url: ' + url + ' extracted ' + extracted.length + ' links');

                callback(null, extracted);

                function qualify (e) {
                    return urls.qualify(me.root, e);
                }

            });
        });
    },

    _extractLinksRecursively: function (targetUrl, callback) {
        var me = this;
        var toCrawl = [];
        var crawled = [];
        var memo = [];

        (function _recursiveExtract(url) {
            url ? extractFromUrl () : extractionCompleted();

            function extractFromUrl () {
                if (me.options.skipExternal && urls.isExternal(me.root, url)) {
                    me._log ('skipping ' + url + ' as external');

                    memo = _.without(memo, url);
                    return _recursiveExtract(toCrawl.pop());
                }

                if (_.contains(crawled, url)) {
                    me._log ('skipping ' + url + ' as already crawled');
                    
                    return _recursiveExtract(toCrawl.pop());
                }

                me._extractLinks(url, function (err, extracted) {
                    if (err) {
                        return callback('extracting links from ' + url + ' failed.');
                    }

                    crawled.push(url);
                    toCrawl = _.union(toCrawl, extracted);
                    memo = _.union(memo, toCrawl);

                    _recursiveExtract(toCrawl.pop());
                });
            }

            function extractionCompleted() {
                me._log('crawling completed, ' + memo.length + ' links extracted');

                callback(null, memo);
            }


        })(targetUrl);
    },

    _log: function (message) {
        this.options.log && console.log(message);
    }
};

module.exports = crawler;