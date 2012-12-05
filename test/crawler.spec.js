var expect = require('chai').expect;
var sinon = require('sinon');

var crawler = require('../src/crawler');

describe('crawler specs', function () {

    describe ('when crawler is created', function () {

        var request;

        beforeEach(function () {
            request = sinon.spy();
        });

        beforeEach(function () {
            crawler.initialize(request);
        });

        it ('should be initialized', function () {
            expect(crawler.request).to.be.ok;
        });

    });

});