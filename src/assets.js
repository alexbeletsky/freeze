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
            var js = _.chain(scripts)
                        .filter(function(script) { return !_.isEmpty(script.getAttribute('src')); })
                        .map(function (script) { return script.getAttribute('src'); })
                        .value();

            var styles = window.document.getElementsByTagName('link');
            var css = _.chain(styles)
                        .filter(function(style) { return style.getAttribute('type') === 'text/css'; })
                        .map(function (style) { return style.getAttribute('href'); })
                        .value();

            assets.js = _.union(assets.js, js);
            assets.css = _.union(assets.css, css);

            callback (null, assets);
        });
    }

};

module.exports = assets;