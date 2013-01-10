var crawler = require('./crawler');
var request = require('request');

var freezeApp = (function () {
    var target = process.argv[2];
    if (!target) {
        return usage();
    }

    // extract all internal links

    // extract all web site assets links

    // read all links content

    // dump assests to the disk

    // fix related link

}());

function usage () {
    console.log('freeze - easy snapshot of dynamic web site.');
    console.log('Usage: freeze URL');
}
