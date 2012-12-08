var expect = require('chai').expect;
var assets = require('../src/assets');

describe('assets.js spec', function () {

    var request, extracted;

    beforeEach(function () {
        request = function (url, callback) {
            callback ();
        };
    });

    beforeEach (function () {
        assets.initialize(request);
    });

    it ('should exist', function () {
        expect(assets).to.be.ok;
    });

    describe('when extracting assets', function () {

        describe('from one page', function () {

            beforeEach(function (done) {
                assets.get('http://target.com', function (err, extractedAssets) {
                    extracted = extractedAssets;
                    done();
                });
            });

            it ('should contain js', function () {
                expect(extracted.js).to.be.ok;
            });

            it ('should contain css', function () {
                expect(extracted.js).to.be.ok;
            });

        });

    });

});