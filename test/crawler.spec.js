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

    describe('when crawling links', function () {
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
                expect(extractedLinks[1]).to.equal('http://target.com/test.html');
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

            it ('should extract all links', function  () {
                expect(extractedLinks.length).to.equal(3);
            });

            it ('should extract all links with correct hrefs', function  () {
                expect(extractedLinks[1]).to.equal('http://target.com/test.html');
                expect(extractedLinks[2]).to.equal('http://target.com/test1.html');
            });

        });

        describe('recursivelly with empty middle page', function () {

            beforeEach(function () {
                request = function (url, callback) {
                    if (url === 'http://target.com') {
                        return callback(null, { statusCode: 200 }, '<a href="test.html">link1</a><a href="test1.html">link2</a>');
                    }

                    if (url === 'http://target.com/test.html') {
                        return callback(null, { statusCode: 200 }, '<body></body>');
                    }

                    if (url === 'http://target.com/test1.html') {
                        return callback(null, { statusCode: 200 }, '<a href="test2.html">link3</a>');
                    }

                    if (url === 'http://target.com/test2.html') {
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

            it ('should extract all links', function  () {
                expect(extractedLinks.length).to.equal(4);
            });

            it ('should extract all links with correct hrefs', function  () {
                expect(extractedLinks[1]).to.equal('http://target.com/test.html');
                expect(extractedLinks[2]).to.equal('http://target.com/test1.html');
                expect(extractedLinks[3]).to.equal('http://target.com/test2.html');
            });

        });

        describe('with fully qualified links', function () {

            beforeEach(function () {
                request = function (url, callback) {
                    if (url === 'http://target.com') {
                        return callback(null, { statusCode: 200 }, '<a href="http://target.com/test.html">link</a>');
                    }

                    if (url === 'http://target.com/test.html') {
                        return callback(null, { statusCode: 200 }, '<a href="http://target.com/test1.html">link</a>');
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

            it ('should extract all links', function  () {
                expect(extractedLinks.length).to.equal(3);
            });

            it ('should extract all links with correct hrefs', function  () {
                expect(extractedLinks[1]).to.equal('http://target.com/test.html');
                expect(extractedLinks[2]).to.equal('http://target.com/test1.html');
            });

        });

        describe('with extrnal ulrs', function () {

            beforeEach(function () {
                request = function (url, callback) {
                    if (url === 'http://target.com') {
                        return callback(null, { statusCode: 200 }, '<a href="test.html">link</a><a href="http://ext.com/test">external</a>');
                    }

                    if (url === 'http://target.com/test.html') {
                        return callback(null, { statusCode: 200 }, '<a href="test1.html">link</a><a href="http://ext.com/test1">external</a>');
                    }

                    if (url === 'http://target.com/test1.html') {
                        return callback(null, { statusCode: 200 }, '<body></body>');
                    }
                };
            });

            beforeEach(function (done) {
                crawler.initialize(request);
                crawler.links('http://target.com', { recursive: true, skipExternal: true }, function (err, links) {
                    extractedLinks = links;
                    done();
                });
            });

            it ('should extract all links', function  () {
                expect(extractedLinks.length).to.equal(3);
            });

            it ('should extract all links with correct hrefs', function  () {
                expect(extractedLinks[1]).to.equal('http://target.com/test.html');
                expect(extractedLinks[2]).to.equal('http://target.com/test1.html');
            });

        });

        describe('with circular loops', function () {

            beforeEach(function () {
                request = function (url, callback) {
                    if (url === 'http://target.com') {
                        return callback(null, { statusCode: 200 }, '<a href="test.html">link</a>');
                    }

                    if (url === 'http://target.com/test.html') {
                        return callback(null, { statusCode: 200 }, '<a href="test1.html">link</a><');
                    }

                    if (url === 'http://target.com/test1.html') {
                        return callback(null, { statusCode: 200 }, '<a href="test.html">link</a>');
                    }
                };
            });

            beforeEach(function (done) {
                crawler.initialize(request);
                crawler.links('http://target.com', { recursive: true, skipExternal: true }, function (err, links) {
                    extractedLinks = links;
                    done();
                });
            });

            it ('should extract all links', function  () {
                expect(extractedLinks.length).to.equal(3);
            });

            it ('should extract all links with correct hrefs', function  () {
                expect(extractedLinks[1]).to.equal('http://target.com/test.html');
                expect(extractedLinks[2]).to.equal('http://target.com/test1.html');
            });

        });


    });

});