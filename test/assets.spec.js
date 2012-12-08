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
                html = '<html></html>';
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
                expect(extracted.css).to.be.ok;
            });

        });

        describe('extracting js references', function () {

            beforeEach(function () {
                html = '<html>\
                    <head>\
                        <script type="text/javascript" src="http://target.com/js/script.js"></script>\
                    </head>\
                    <body>\
                    </body>\
                ';
            });

            beforeEach(function (done) {
                assets.extract(html, function (err, extractedAssets) {
                    extracted = extractedAssets;
                    done();
                });
            });

            it ('should extract js reference', function () {
                expect(extracted.js[0]).to.equal('http://target.com/js/script.js');
            });

        });

        describe('extracting css references', function () {

            beforeEach(function () {
                html = '<html>\
                    <head>\
                        <link rel="stylesheet" type="text/css" href="http://target.com/css/style.css"/>\
                    </head>\
                    <body>\
                    </body>\
                ';
            });

            beforeEach(function (done) {
                assets.extract(html, function (err, extractedAssets) {
                    extracted = extractedAssets;
                    done();
                });
            });

            it ('should extract js reference', function () {
                expect(extracted.css[0]).to.equal('http://target.com/css/style.css');
            });

        });

    });

});