var jsdom = require('jsdom');
var jQuery = require('jquery');

module.exports = function (res, callback) {
    jsdom.env({
        html: res
    }, function (err, window) {
        if (err) {
            return callback (err);
        }

        var $ = jQuery(window.document);
        var links = $.find('a');
        
        callback (null, links);
    });

};