var fs = require('fs');
var request = require('request');

var expect = require('chai').expect;
var sinon = require('sinon');

var dump = require('../src/dump');

describe('dump.js #integration', function () {
    var testFolder;

    beforeEach(function () {
        testFolder = __dirname + '/_freeze';
    });

    beforeEach(function () {
        //fs.mkdirSync(testFolder);
    });

    afterEach(function () {
        //fs.rmdirSync(testFolder);
    });

    it ('should exist', function () {
        expect(dump).to.be.ok;
    });

    describe('when dumping to file system', function () {
        var dumpResults;

        beforeEach(function () {
            dump.initialize(fs, request);
        });

        describe ('dumping root url', function () {

            beforeEach (function (done) {
                dump.toFileSystem(testFolder, ['http://www.udacity.com/cs101x/index.html'], function (err, results) {
                    if (err) {
                        throw err;
                    }

                    dumpResults = results;
                    done();
                });
            });

            it ('should index file created', function () {
                expect(fs.statSync(testFolder + '/index.html').isFile()).to.be.true;
            });

        });


    });

});