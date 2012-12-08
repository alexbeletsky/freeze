var expect = require('chai').expect;
var assets = require('../src/assets');

describe('assets.js spec', function () {

    var html, extracted;

    it ('should exist', function () {
        expect(assets).to.be.ok;
    });

    describe('when extracting assets', function () {

        describe('empty html', function () {

            beforeEach(function () {
                html = '';
            });

            beforeEach(function (done) {
                assets.extract(html, function (err, extractedAssets) {
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