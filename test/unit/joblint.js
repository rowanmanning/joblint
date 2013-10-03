/* jshint maxstatements: false, maxlen: false */
/* global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

describe('joblint', function () {
    var createLinter, joblint, rules;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        createLinter = require('../mock/linter');
        mockery.registerMock('./linter', createLinter);

        rules = {
            broCulture: sinon.spy(),
            bubble: sinon.spy(),
            expectations: sinon.spy(),
            language: sinon.spy(),
            realism: sinon.spy(),
            sexism: sinon.spy(),
            tech: sinon.spy()
        };
        mockery.registerMock('./rule/bro-culture', rules.broCulture);
        mockery.registerMock('./rule/bubble', rules.bubble);
        mockery.registerMock('./rule/expectations', rules.expectations);
        mockery.registerMock('./rule/language', rules.language);
        mockery.registerMock('./rule/realism', rules.realism);
        mockery.registerMock('./rule/sexism', rules.sexism);
        mockery.registerMock('./rule/tech', rules.tech);

        joblint = require('../../lib/joblint');
    });

    afterEach(function () {
        mockery.disable();
    });

    it('should be a function', function () {
        assert.isFunction(joblint);
    });

    describe('.call()', function () {
        var linter, returnVal;

        beforeEach(function () {
            returnVal = joblint('foo');
            linter = createLinter.firstCall.returnValue;
        });

        it('should create a linter', function () {
            assert.strictEqual(createLinter.callCount, 1);
        });

        it('should load the rules and call with the linter', function () {
            assert.strictEqual(rules.broCulture.withArgs(linter).callCount, 1);
            assert.strictEqual(rules.bubble.withArgs(linter).callCount, 1);
            assert.strictEqual(rules.expectations.withArgs(linter).callCount, 1);
            assert.strictEqual(rules.language.withArgs(linter).callCount, 1);
            assert.strictEqual(rules.realism.withArgs(linter).callCount, 1);
            assert.strictEqual(rules.sexism.withArgs(linter).callCount, 1);
            assert.strictEqual(rules.tech.withArgs(linter).callCount, 1);
        });

        it('should lint the passed in body text with the linter', function () {
            assert.strictEqual(linter.lint.withArgs('foo').callCount, 1);
        });

        it('should return the result of the lint', function () {
            assert.strictEqual(returnVal, linter.mockResult);
        });

    });

});
