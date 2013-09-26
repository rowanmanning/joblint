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
            sexism: sinon.spy()
        };
        mockery.registerMock('../rule/sexism', rules.sexism);

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
            assert.strictEqual(rules.sexism.withArgs(linter).callCount, 1);
        });

        it('should lint the passed in body text with the linter', function () {
            assert.strictEqual(linter.lint.withArgs('foo').callCount, 1);
        });

        it('should return the result of the lint', function () {
            assert.strictEqual(returnVal, linter.mockResult);
        });

    });

});
