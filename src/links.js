var jsdom = require('jsdom');
var _ = require('underscore');

var extract = function (html, callback) {
    jsdom.env({
        html: html
    }, function (err, window) {
        if (err) {
            return callback (err);
        }

        var hrefs = window.document.getElementsByTagName('a');
        var links = _.map(hrefs, function (href) {
            return href.getAttribute('href');
        });

        callback (null, links);
    });
};

module.exports = {
    extract: extract
};