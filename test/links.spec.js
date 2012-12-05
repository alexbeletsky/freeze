var crawler = require('../src/crawler');
var expect = require('chai').expect;

describe('links spec', function () {

    describe('response without any links', function () {
        var links;

        beforeEach(function (done) {
            var response = '\
                <html>\
                <head>\
                    <title>Test,test,test</title>\
                </head>\
                <body>\
                </body>\
            ';

            crawler(response, function (err, l) {
                links = l;

                done();
            });
        });

        it ('should be links be empty', function () {
            expect(links.length).to.equal(0);
        });

    });

    describe('response with one link', function () {
        var links;

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

            crawler(response, function (e, l) {
                links = l;
                done();
            });
        });

        it ('should have one link', function () {
            expect(links.length).to.equal(1);
        });
    
    });

    describe ('response with few links', function () {
        var links;

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

            crawler(response, function (e, l) {
                links = l;
                done();
            });
        });

        it ('should have three links', function () {
            expect(links.length).to.equal(3);
        });

    });

    describe ('contains href inside', function () {
        var links;

        beforeEach(function (done) {
            var response = '<a href="test">test</a><a href="http://a.com/test">test</a><a href="/blog/link-12">link</a>';

            crawler(response, function (err, l) {
                links = l;
                done();
            });
        });

        it ('should have href for first link', function () {
            expect(links[0]).to.equal('test');
        });

        it ('should have href for second link', function () {
            expect(links[1]).to.equal('http://a.com/test');
        });

        it ('should have href for second link', function () {
            expect(links[2]).to.equal('/blog/link-12');
        });

    });

});