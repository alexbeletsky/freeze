var jsdom = require('jsdom');
var _ = require('underscore');

module.exports = function (html, callback) {
    jsdom.env({
        html: html
    }, function (err, window) {
        if (err) {
            return callback (err);
        }

        var hrefs = window.document.getElementsByTagName('a');
        if (_.isEmpty(hrefs)) {
            return callback(null, []);
        }

        var links = _.map(hrefs, function (href) {
            return href.getAttribute('href');
        });

        callback (null, links);
    });

};