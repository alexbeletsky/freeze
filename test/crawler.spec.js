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

    describe('when crawling', function () {
        var extractedLinks;

        describe('any page', function () {
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

            it ('should have target site as first link', function () {
                expect(extractedLinks[0]).to.equal('http://target.com');
            });

        });

        describe('one page', function () {

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
                expect(extractedLinks[1]).to.equal('test.html');
            });
        });

        describe('recursivelly', function () {

            beforeEach(function () {
                request = function (url, callback) {
                    if (url === 'http://target.com') {
                        return callback(null, { statusCode: 200 }, '<a href="test.html">link</a>');
                    }

                    if (url === 'http://target.com/test.html') {
                        return callback(null, { statusCode: 200 }, '<a href="test1.html">link</a>');
                    }

                    if (url === 'http://target.com/test1.html') {
                        return callback(null, { statusCode: 200 }, '<body></body>');
                    }
                };
            });

            beforeEach(function (done) {
                crawler.initialize(request);
                crawler.links('http://target.com', { recursive: true }, function (err, links) {
                    extractedLinks = links;
                    done();
                });
            });

        });

    });

    describe ('when crawling one page', function () {

    });

    describe ('when crawling recursivelly', function () {

        // it ('should extract all links', function  () {
        //     expect(extractedLinks).to.be.ok;
        //     expect(extractedLinks.length).to.equal(2);
        // });

    });

});