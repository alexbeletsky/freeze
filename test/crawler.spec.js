var expect = require('chai').expect;
var sinon = require('sinon');

var crawler = require('../src/crawler');

describe('crawler specs', function () {

    var request;

    beforeEach(function () {
        request = function (url, callback) {
            callback();
        };
    });

    beforeEach(function () {
        crawler.initialize(request);
    });

    describe ('when crawler is created', function () {

        it ('should be initialized', function () {
            expect(crawler.request).to.be.ok;
        });

    });

    describe ('when crawler started to extract links', function () {
        var extractedLinks;

        beforeEach(function () {
            request = function (url, callback) {
                callback(null, { statusCode: 200 }, '<a href="test.html">link</a>');
            };
        });

        beforeEach(function (done) {
            crawler.initialize(request);
            crawler.links('http://target.com', function (err, links) {
                extractedLinks = links;
                done();
            });
        });

        it ('should extract all links from url', function () {
            expect(extractedLinks).to.be.ok;
        });

        it ('should have correct href', function () {
            expect(extractedLinks[0]).to.equal('test.html');
        });

    });

});