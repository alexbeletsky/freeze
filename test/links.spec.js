var links = require('../src/links');
var expect = require('chai').expect;

describe('links spec', function () {
    var extracted;

    describe('response without any links', function () {

        beforeEach(function (done) {
            var response = '\
                <html>\
                <head>\
                    <title>Test,test,test</title>\
                </head>\
                <body>\
                </body>\
            ';

            links.extract(response, function (err, l) {
                extracted = l;
                done();
            });
        });

        it ('should be links be empty', function () {
            expect(extracted.length).to.equal(0);
        });

    });

    describe('response with one link', function () {

        beforeEach(function (done) {
            var response = '\
                <html>\
                <head>\
                    <title>Test,test,test</title>\
                </head>\
                <body>\
                    <div class="some">\
                        <a href="/link">Click me</a>\
                    </div>\
                </body>\
            ';

            links.extract(response, function (e, l) {
                extracted = l;
                done();
            });
        });

        it ('should have one link', function () {
            expect(extracted.length).to.equal(1);
        });
    
    });

    describe ('response with few links', function () {

        beforeEach(function (done) {
            var response = '\
                <html>\
                <head>\
                    <title>Test,test,test</title>\
                </head>\
                <body>\
                    <div class="some">\
                        <a href="/link">Click me</a>\
                    </div>\
                    <ul>\
                        <li><a href="ss">Sss</a></li>\
                    </ul>\
                    <footer>\
                        <a href="http://some.com">Created by Some</a>\
                    </footer>\
                </body>\
            ';

            links.extract(response, function (e, l) {
                extracted = l;
                done();
            });
        });

        it ('should have three links', function () {
            expect(extracted.length).to.equal(3);
        });

    });

    describe ('contains href inside', function () {

        beforeEach(function (done) {
            var response = '<a href="test">test</a><a href="http://a.com/test">test</a><a href="/blog/link-12">link</a>';

            links.extract(response, function (err, l) {
                extracted = l;
                done();
            });
        });

        it ('should have href for first link', function () {
            expect(extracted[0]).to.equal('test');
        });

        it ('should have href for second link', function () {
            expect(extracted[1]).to.equal('http://a.com/test');
        });

        it ('should have href for second link', function () {
            expect(extracted[2]).to.equal('/blog/link-12');
        });

    });

});