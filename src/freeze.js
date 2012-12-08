var crawler = require('./crawler');
var request = require('request');

var freezeApp = (function () {
    var target = process.argv[2];
    if (!target) {
        return usage();
    }

    // extract all internal links
    extractAllLinks(target, allLinksExtracted);

    function extractAllLinks(target, callback) {
        crawler.initialize(request);
        crawler.links(target, { recursive: true, log: true }, allLinksExtracted);
    }

    function allLinksExtracted (err, links) {
        if (err) {
            throw err;
        }

        console.log(links);
    }

    // extract all web site assets links

    // read all links content

    // dump assests to the disk

    // dump content to the disk

}());

function usage () {
    console.log('freeze - easy snapshot of dynamic web site.');
    console.log('Usage: freeze URL');
}
