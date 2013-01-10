var async = require('async');
var _ = require('underscore');
var urls = require('./urls');

var dump = {
    initialize: function (fs, request) {
        this.fs = fs;
        this.request = request;
    },

    toFileSystem: function (root, links, callback) {
        var dumpTask = _.bind(function (link) {
            var me = this;
            return function (callback) {
                var path = root + '/' + urls.toFile(link);
                var stream = me.fs.createWriteStream(path);

                stream.on('close', function () {
                    callback(null, { url: link, path: path});
                });

                stream.on('error', function (err) {
                    callback(err);
                });

                me.request(link).pipe(stream);
            };
        }, this);


        var dumpTasks = _.map(links, function (link) {
            return dumpTask(link);
        });

        async.parallel(dumpTasks, function (err, results) {
            if (err) {
                return callback(err);
            }

            callback(null, results);
        });

    }

};

module.exports = dump;