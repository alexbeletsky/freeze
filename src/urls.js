var _ = require('underscore');

var urls = {
    qualify: function (root, link) {
        if (link.indexOf('http://') === 0 || link.indexOf('https://') === 0) {
            return link;
        }

        if (_.last(root) !== '/') {
            root += '/';
        }

        return root + link;
    },

    isExternal: function (root, link) {
        return link.indexOf(root) !== 0;
    }
};

module.exports = urls;