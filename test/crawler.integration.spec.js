var expect = require('chai').expect;

var crawler = require('../src/crawler');
var request = require('request');

describe('crawler.js #integration spec', function (argument) {
    var target, extracted;

    beforeEach(function (done) {
        target = 'http://www.udacity.com/cs101x/index.html';
        crawler.initialize(request);

        crawler.links(target, function (err, links) {
            if (err) {
                throw err;
            }

            extracted = links;
            done();
        });
    });

    it ('should extract all links', function () {
        expect(extracted[0]).to.equal('http://www.udacity.com/cs101x/index.html');
        expect(extracted[1]).to.equal('http://www.udacity.com/cs101x/crawling.html');
        expect(extracted[2]).to.equal('http://www.udacity.com/cs101x/walking.html');
        expect(extracted[3]).to.equal('http://www.udacity.com/cs101x/flying.html');
    });

});