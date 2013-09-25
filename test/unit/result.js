/* global beforeEach, describe, it */
'use strict';

var assert = require('proclaim');

describe('result', function () {
    var createResult;

    beforeEach(function () {
        createResult = require('../../lib/result');
    });

    it('should be a function', function () {
        assert.isFunction(createResult);
    });

    describe('.call()', function () {
        var result;

        beforeEach(function () {
            result = createResult();
        });

        it('should return an object', function () {
            assert.isObject(result);
        });

        describe('[returned object]', function () {

            it('should have an errors property (array)', function () {
                assert.isArray(result.errors);
            });

            it('should have a warnings property (array)', function () {
                assert.isArray(result.warnings);
            });

            it('should have a notices property (array)', function () {
                assert.isArray(result.notices);
            });

            it('should have an addError method', function () {
                assert.isFunction(result.addError);
            });

            it('should have an addWarning method', function () {
                assert.isFunction(result.addWarning);
            });

            it('should have an addNotice method', function () {
                assert.isFunction(result.addNotice);
            });

            describe('.addError()', function () {

                beforeEach(function () {
                    result.addError('foo');
                    result.addError('bar');
                });

                it('should add the passed in messages to the errors property', function () {
                    assert.lengthEquals(result.errors, 2);
                    assert.strictEqual(result.errors[0], 'foo');
                    assert.strictEqual(result.errors[1], 'bar');
                });

            });

            describe('.addWarning()', function () {

                beforeEach(function () {
                    result.addWarning('foo');
                    result.addWarning('bar');
                });

                it('should add the passed in messages to the warnings property', function () {
                    assert.lengthEquals(result.warnings, 2);
                    assert.strictEqual(result.warnings[0], 'foo');
                    assert.strictEqual(result.warnings[1], 'bar');
                });

            });

            describe('.addNotice()', function () {

                beforeEach(function () {
                    result.addNotice('foo');
                    result.addNotice('bar');
                });

                it('should add the passed in messages to the notices property', function () {
                    assert.lengthEquals(result.notices, 2);
                    assert.strictEqual(result.notices[0], 'foo');
                    assert.strictEqual(result.notices[1], 'bar');
                });

            });

        });

    });

});
