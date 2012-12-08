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

            describe('with few references', function () {

                beforeEach(function () {
                    html = '<html>\
                        <head>\
                            <script type="text/javascript" src="http://target.com/js/script.js"></script>\
                            <script type="text/javascript" src="http://target.com/js/script_1.js"></script>\
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
                    expect(extracted.js[1]).to.equal('http://target.com/js/script_1.js');
                });

            });

            describe('with inline scripts', function () {

                beforeEach(function () {
                    html = '<html>\
                        <head>\
                            <script type="text/javascript" src="http://target.com/js/script.js"></script>\
                            <script type="text/javascript" src="http://target.com/js/script_1.js"></script>\
                            <script>$(function() {});</script>\
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

                it ('should ignore inline script', function () {
                    expect(extracted.js.length).to.equal(2);
                });

            });
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

        it ('should extract css reference', function () {
            expect(extracted.css[0]).to.equal('http://target.com/css/style.css');
        });

        describe('with few references', function () {

            beforeEach(function () {
                html = '<html>\
                    <head>\
                        <link rel="stylesheet" type="text/css" href="http://target.com/css/style.css"/>\
                        <link rel="stylesheet" type="text/css" href="http://target.com/css/style1.css"/>\
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

            it ('should extract all references', function () {
                expect(extracted.css[0]).to.equal('http://target.com/css/style.css');
                expect(extracted.css[1]).to.equal('http://target.com/css/style1.css');
            });

            describe('with inline styles', function () {

                beforeEach(function () {
                    html = '<html>\
                        <head>\
                            <link rel="stylesheet" type="text/css" href="http://target.com/css/style.css"/>\
                            <link rel="stylesheet" type="text/css" href="http://target.com/css/style1.css"/>\
                            <style></style>\
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

                it ('should extract all references', function () {
                    expect(extracted.css.length).to.equal(2);
                });

            });

            describe('with styles different from "text/css"', function () {

                beforeEach(function () {
                    html = '<html>\
                        <head>\
                            <link rel="stylesheet" type="text/css" href="http://target.com/css/style.css"/>\
                            <link rel="stylesheet" type="text/css" href="http://target.com/css/style1.css"/>\
                            <link rel="stylesheet" type="text/notcss" href="http://target.com/css/style3.css"/>\
                            <style></style>\
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

                it ('should ignore noncss', function () {
                    expect(extracted.css.length).to.equal(2);
                });

            });

        });

    });

});