/* jshint maxstatements: false, maxlen: false */
/* global beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var sinon = require('sinon');

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

            it('should have a failPoints property (object)', function () {
                assert.isObject(result.failPoints);
                assert.strictEqual(result.failPoints.culture, 0);
                assert.strictEqual(result.failPoints.realism, 0);
                assert.strictEqual(result.failPoints.recruiter, 0);
                assert.strictEqual(result.failPoints.tech, 0);
            });

            it('should have a setCurrentRule method', function () {
                assert.isFunction(result.setCurrentRule);
            });

            it('should have a clearCurrentRule method', function () {
                assert.isFunction(result.clearCurrentRule);
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

            it('should have an addCultureFailPoints method', function () {
                assert.isFunction(result.addCultureFailPoints);
            });

            it('should have an addRealismFailPoints method', function () {
                assert.isFunction(result.addRealismFailPoints);
            });

            it('should have an addRecruiterFailPoints method', function () {
                assert.isFunction(result.addRecruiterFailPoints);
            });

            it('should have an addTechFailPoints method', function () {
                assert.isFunction(result.addTechFailPoints);
            });

            it('should have a hasMessages method', function () {
                assert.isFunction(result.hasMessages);
            });

            it('should have a hasFailPoints method', function () {
                assert.isFunction(result.hasFailPoints);
            });

            it('should have an isClean method', function () {
                assert.isFunction(result.isClean);
            });

            describe('.setCurrentRule()', function () {
                var rule;

                beforeEach(function () {
                    rule = {};
                    result.setCurrentRule(rule);
                });

                it('should set the currentRule property', function () {
                    assert.strictEqual(result.currentRule, rule);
                });

            });

            describe('.clearCurrentRule()', function () {

                beforeEach(function () {
                    result.setCurrentRule({});
                    result.clearCurrentRule();
                });

                it('should delete the currentRule property', function () {
                    assert.isUndefined(result.currentRule);
                });

            });

            describe('.addError()', function () {

                beforeEach(function () {
                    result.setCurrentRule({desc: 'hello'});
                    result.addError('foo');
                    result.addError('bar');
                    result.addError('baz', [1, 2, 3]);
                    result.clearCurrentRule();
                });

                it('should add the passed in messages to the errors property', function () {
                    assert.lengthEquals(result.errors, 3);
                    assert.deepEqual(result.errors[0], {message: 'foo', detail: 'hello', evidence: []});
                    assert.deepEqual(result.errors[1], {message: 'bar', detail: 'hello', evidence: []});
                });

                it('should store evidence if given', function () {
                    assert.deepEqual(result.errors[2], {message: 'baz', detail: 'hello', evidence: [1, 2, 3]});
                });

            });

            describe('.addWarning()', function () {

                beforeEach(function () {
                    result.setCurrentRule({desc: 'hello'});
                    result.addWarning('foo');
                    result.addWarning('bar');
                    result.addWarning('baz', [1, 2, 3]);
                    result.clearCurrentRule();
                });

                it('should add the passed in messages to the warnings property', function () {
                    assert.lengthEquals(result.warnings, 3);
                    assert.deepEqual(result.warnings[0], {message: 'foo', detail: 'hello', evidence: []});
                    assert.deepEqual(result.warnings[1], {message: 'bar', detail: 'hello', evidence: []});
                });

                it('should store evidence if given', function () {
                    assert.deepEqual(result.warnings[2], {message: 'baz', detail: 'hello', evidence: [1, 2, 3]});
                });

            });

            describe('.addNotice()', function () {

                beforeEach(function () {
                    result.setCurrentRule({desc: 'hello'});
                    result.addNotice('foo');
                    result.addNotice('bar');
                    result.addNotice('baz', [1, 2, 3]);
                    result.clearCurrentRule();
                });

                it('should add the passed in messages to the notices property', function () {
                    assert.lengthEquals(result.notices, 3);
                    assert.deepEqual(result.notices[0], {message: 'foo', detail: 'hello', evidence: []});
                    assert.deepEqual(result.notices[1], {message: 'bar', detail: 'hello', evidence: []});
                });

                it('should store evidence if given', function () {
                    assert.deepEqual(result.notices[2], {message: 'baz', detail: 'hello', evidence: [1, 2, 3]});
                });

            });

            describe('.addCultureFailPoints()', function () {

                it('should increment the failPoints.culture property by the specified amount', function () {
                    result.addCultureFailPoints(2);
                    result.addCultureFailPoints(2.5);
                    assert.strictEqual(result.failPoints.culture, 5);
                });

                it('should increment the failPoints.culture property by one when called with no arguments', function () {
                    result.addCultureFailPoints();
                    assert.strictEqual(result.failPoints.culture, 1);
                });

            });

            describe('.addRealismFailPoints()', function () {

                it('should increment the failPoints.realism property by the specified amount', function () {
                    result.addRealismFailPoints(2);
                    result.addRealismFailPoints(2.5);
                    assert.strictEqual(result.failPoints.realism, 5);
                });

                it('should increment the failPoints.realism property by one when called with no arguments', function () {
                    result.addRealismFailPoints();
                    assert.strictEqual(result.failPoints.realism, 1);
                });

            });

            describe('.addRecruiterFailPoints()', function () {

                it('should increment the failPoints.recruiter property by the specified amount', function () {
                    result.addRecruiterFailPoints(2);
                    result.addRecruiterFailPoints(2.5);
                    assert.strictEqual(result.failPoints.recruiter, 5);
                });

                it('should increment the failPoints.recruiter property by one when called with no arguments', function () {
                    result.addRecruiterFailPoints();
                    assert.strictEqual(result.failPoints.recruiter, 1);
                });

            });

            describe('.addTechFailPoints()', function () {

                it('should increment the failPoints.tech property by the specified amount', function () {
                    result.addTechFailPoints(2);
                    result.addTechFailPoints(2.5);
                    assert.strictEqual(result.failPoints.tech, 5);
                });

                it('should increment the failPoints.tech property by one when called with no arguments', function () {
                    result.addTechFailPoints();
                    assert.strictEqual(result.failPoints.tech, 1);
                });

            });

            describe('.hasMessages()', function () {

                it('should return true if any errors, warnings or notices are present', function () {
                    result.errors = ['foo'];
                    result.warnings = [];
                    result.notices = [];
                    assert.isTrue(result.hasMessages());

                    result.errors = [];
                    result.warnings = ['foo'];
                    result.notices = [];
                    assert.isTrue(result.hasMessages());

                    result.errors = [];
                    result.warnings = [];
                    result.notices = ['foo'];
                    assert.isTrue(result.hasMessages());

                    result.errors = ['foo'];
                    result.warnings = ['bar'];
                    result.notices = ['baz'];
                    assert.isTrue(result.hasMessages());
                });

                it('should return false if there are no errors, warnings or notices present', function () {
                    assert.isFalse(result.hasMessages());
                });

            });

            describe('.hasFailPoints()', function () {

                it('should return true if any fail points are present', function () {
                    result.failPoints = {culture: 1, realism: 0, recruiter: 0, tech: 0};
                    assert.isTrue(result.hasFailPoints());

                    result.failPoints = {culture: 0, realism: 1, recruiter: 0, tech: 0};
                    assert.isTrue(result.hasFailPoints());

                    result.failPoints = {culture: 0, realism: 0, recruiter: 1, tech: 0};
                    assert.isTrue(result.hasFailPoints());

                    result.failPoints = {culture: 0, realism: 0, recruiter: 0, tech: 1};
                    assert.isTrue(result.hasFailPoints());
                });

                it('should return false if there are no fail points present', function () {
                    assert.isFalse(result.hasFailPoints());
                });

            });

            describe('.isClean()', function () {

                it('should return true if there are no errors or fail points present', function () {
                    assert.isTrue(result.isClean());
                });

                it('should return false if there are no fail points present', function () {
                    result.hasMessages = sinon.stub();
                    result.hasFailPoints = sinon.stub();

                    result.hasMessages.returns(true);
                    result.hasFailPoints.returns(false);
                    assert.isFalse(result.isClean());

                    result.hasMessages.returns(false);
                    result.hasFailPoints.returns(true);
                    assert.isFalse(result.isClean());
                });

            });

        });

    });

});
