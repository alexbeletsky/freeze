var expect = require('chai').expect;
var urls = require('../src/urls');

describe('url.js spec', function () {
    var url;

    describe('when construncting', function () {

        it ('should exist', function () {
            expect(urls).to.be.ok;
        });

    });

    describe('when qualifying url', function () {
        var root, link;

        describe('for relative urls', function () {
            beforeEach(function () {
                root = 'http://a.com';
                link = 'link';
            });

            beforeEach(function () {
                url = urls.qualify(root, link);
            });

            it('should created fully qualifed link', function () {
                expect(url).to.equal('http://a.com/link');
            });

            it('should not change original root', function () {
                expect(root).to.equal('http://a.com');
            });

            describe('root with / at end', function () {

                beforeEach(function () {
                    root = 'http://a.com/';
                    link = 'link';
                });

                beforeEach(function () {
                    url = urls.qualify(root, link);
                });

                it('should created fully qualifed link', function () {
                    expect(url).to.equal('http://a.com/link');
                });

                it('should not change original root', function () {
                    expect(root).to.equal('http://a.com/');
                });

            });

        });

        describe('for absolute urls', function () {

            beforeEach(function () {
                root = 'http://a.com';
                link = 'http://a.com/link';
            });

            beforeEach(function () {
                url = urls.qualify(root, link);
            });

            it('should create fully qualifed link', function () {
                expect(url).to.equal('http://a.com/link');
            });

            describe('when link has a different root', function () {

                beforeEach(function () {
                    root = 'http://a.com';
                    link = 'http://b.com/link';
                });

                beforeEach(function () {
                    url = urls.qualify(root, link);
                });

                it('should create fully qualifed link', function () {
                    expect(url).to.equal('http://b.com/link');
                });

            });

        });

    });

});