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

            var styles = window.document.getElementsByTagName('link');
            var css = _.map(styles, function (style) {
                return style.getAttribute('href');
            });

            assets.js = _.union(assets.js, js);
            assets.css = _.union(assets.css, css);
            
            callback (null, assets);
        });
    }

};

module.exports = assets;