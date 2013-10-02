/* jshint maxstatements: false, maxlen: false */
/* global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

describe('linter', function () {
    var createResult, createSpec, createLinter;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        createResult = require('../mock/result');
        mockery.registerMock('./result', createResult);

        createSpec = require('../mock/spec');
        mockery.registerMock('./spec', createSpec);

        createLinter = require('../../lib/linter');
    });

    afterEach(function () {
        mockery.disable();
    });

    it('should be a function', function () {
        assert.isFunction(createLinter);
    });

    describe('.call()', function () {
        var linter;

        beforeEach(function () {
            linter = createLinter();
        });

        it('should return an object', function () {
            assert.isObject(linter);
        });

        describe('[returned object]', function () {

            it('should have a rules property (array)', function () {
                assert.isArray(linter.rules);
            });

            it('should have an addRule method', function () {
                assert.isFunction(linter.addRule);
            });

            it('should have a lint method', function () {
                assert.isFunction(linter.lint);
            });

            describe('.addRule()', function () {
                var rule1, rule2;

                beforeEach(function () {
                    rule1 = sinon.spy();
                    rule2 = sinon.spy();
                    linter.addRule(rule1);
                    linter.addRule(rule2);
                });

                it('should add the passed in rule to the rules property', function () {
                    assert.lengthEquals(linter.rules, 2);
                    assert.strictEqual(linter.rules[0], rule1);
                    assert.strictEqual(linter.rules[1], rule2);
                });

            });

            describe('.lint()', function () {
                var result, rule1, rule2, spec;

                beforeEach(function () {
                    rule1 = {test: sinon.spy()};
                    rule2 = {test: sinon.spy()};
                    linter.rules = [rule1, rule2];
                    linter.lint('foo');
                    result = createResult.firstCall.returnValue;
                    spec = createSpec.firstCall.returnValue;
                });

                it('should create a result', function () {
                    assert.strictEqual(createResult.callCount, 1);
                });

                it('should create a spec with the passed in body text', function () {
                    assert.strictEqual(createSpec.withArgs('foo').callCount, 1);
                });

                it('should set the result\'s current rule for each rule', function () {
                    assert.strictEqual(result.setCurrentRule.withArgs(rule1).callCount, 1);
                    assert.strictEqual(result.setCurrentRule.withArgs(rule2).callCount, 1);
                });

                it('should call each rule with the spec and the result', function () {
                    assert.strictEqual(rule1.test.withArgs(spec, result).callCount, 1);
                    assert.strictEqual(rule2.test.withArgs(spec, result).callCount, 1);
                });

                it('should clear the result\'s current rule', function () {
                    assert.strictEqual(result.clearCurrentRule.callCount, 1);
                });

            });

        });

    });

});
