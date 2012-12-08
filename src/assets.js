var jsdom = require('jsdom');
var _ = require('underscore');

var assets = {
    extract: function (html, callback) {
        var assets = { js: [], css: [] };

        jsdom.env({
            html: html
        }, function (err, window) {
            if (err) {
                return callback (err);
            }

            var scripts = window.document.getElementsByTagName('script');
            var js = _.map(scripts, function (script) {
                return script.getAttribute('src');
            });

            assets.js = _.union(assets.js, js);

            callback (null, assets);
        });
    }

};

module.exports = assets;