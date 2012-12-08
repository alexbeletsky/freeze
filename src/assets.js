var assets = {
    extract: function (html, callback) {
        var assets = { js: [], css: [] };

        callback (null, assets);
    }

};

module.exports = assets;