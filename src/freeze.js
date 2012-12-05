var crawler = require('./crawler');

function usage () {
    console.log('freeze - easy snapshot of dynamic web site.');
    console.log('Usage: freeze URL');
}

var freezeApp = (function () {

    // get all arguments
    if (process.argv.length < 3) {
        usage ();
    }

    // extract all internal links
    var target = process.argv[2];

    // extract all web site assets links
    extractAllLinks(target, allLinksExtracted);
    
    function extractAllLinks(target, callback) {

        var links = [];

        links.push(target);

        function extractLinks(url) {
            var extractedLinks = crawler.links(url, function (err, extracted) {
                if (err) {
                    throw err;
                }

                links = _.union(links, extracted);
                _.each(links, function (link) {
                    extractedLinks(link);
                });
            });

        }
    }

    // read all links content
    function allLinksExtracted (err, links) {
        if (err) {
            throw err;
        }
    }


    // dump assests to the disk

    // dump content to the disk

}());