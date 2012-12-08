var assets = {
    initialize: function (request) {
        this.request = request;
    },

    get: function (url, callback) {
        callback (null, {});
    }

};

module.exports = assets;