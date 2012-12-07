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
        var root;

        describe('for relative urls', function () {
            beforeEach(function () {
                root = 'http://a.com';
            });

            beforeEach(function () {
                url = urls.qualify('http://a.com', 'link');
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
                });

                beforeEach(function () {
                    url = urls.qualify(root, 'link');
                });

                it('should created fully qualifed link', function () {
                    expect(url).to.equal('http://a.com/link');
                });

                it('should not change original root', function () {
                    expect(root).to.equal('http://a.com/');
                });

            });

        });

    });

});