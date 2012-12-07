var _ = require('underscore');

var urls = {
    qualify: function (root, link) {
        if (_.last(root) !== '/') {
            root += '/';
        }
        return root + link;
    }
};

module.exports = urls;