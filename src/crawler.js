//var jsdom = require('jsdom');
var jQuery = require('jquery');
module.exports = function (res, callback) {
    // jsdom.env({
    //     html: res,
    //     scripts: [
    //         'http://code.jquery.com/jquery-1.5.min.js'
    //     ],
    //     config: {
    //         SkipExternalResources: true
    //     }
    // }, function (err, window) {
    //     if (err) {
    //         return callback (err);
    //     }

    //     var links = window.jQuery('a');
    //     callback (null, links);
    // });

    var links = jQuery(res).find('a');
    callback(null, links);

};