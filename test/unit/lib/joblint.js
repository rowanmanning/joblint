// jshint maxstatements: false
// jscs:disable disallowMultipleVarDecl, maximumLineLength
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

describe('lib/joblint', function () {
    var extend, joblint, options;

    beforeEach(function () {

        extend = sinon.spy(require('extend'));
        mockery.registerMock('extend', extend);

        joblint = require('../../../lib/joblint');

        options = {
            rules: []
        };

    });

    it('should be a function', function () {
        assert.isFunction(joblint);
    });

    it('should have a `defaults` property', function () {
        assert.isObject(joblint.defaults);
    });

    describe('.defaults', function () {
        var defaults;

        beforeEach(function () {
            defaults = joblint.defaults;
        });

        it('should have a `rules` property', function () {
            assert.isObject(defaults.rules);
            assert.deepEqual(defaults.rules, require('../../../lib/rules'));
        });

    });

    describe('joblint()', function () {

        it('should default the options', function () {
            if (typeof window !== 'undefined') {
                return;
            }
            joblint('', options);
            assert.calledOnce(extend);
            assert.isObject(extend.firstCall.args[0]);
            assert.strictEqual(extend.firstCall.args[1], joblint.defaults);
            assert.strictEqual(extend.firstCall.args[2], options);
        });

        it('should should return an object', function () {
            assert.isObject(joblint('', options));
        });

    });

    describe('result', function () {
        var result;

        beforeEach(function () {
            result = joblint('', options);
        });

        it('should should have a `counts` property', function () {
            assert.isObject(result.counts);
        });

        it('should should have an `issues` property', function () {
            assert.isArray(result.issues);
            assert.lengthEquals(result.issues, 0);
        });

        it('should be the same for each run', function () {
            options.rules.push({
                triggers: [
                    'he'
                ]
            });
            var result1 = joblint('he should have his head screwed on', options);
            var result2 = joblint('he should have his head screwed on', options);
            assert.deepEqual(result1, result2);
        });

    });

    describe('rule matching', function () {

        it('should test the input for triggers in all rules', function () {
            options.rules.push({
                triggers: [
                    'he'
                ]
            });
            options.rules.push({
                triggers: [
                    'his'
                ]
            });
            var result = joblint('he should have his head screwed on', options);
            assert.lengthEquals(result.issues, 2);
        });

        it('should test the input for all triggers', function () {
            options.rules.push({
                triggers: [
                    'he',
                    'his'
                ]
            });
            var result = joblint('he should have his head screwed on', options);
            assert.lengthEquals(result.issues, 2);
        });

        it('should find all matches for a trigger', function () {
            options.rules.push({
                triggers: [
                    'he|his'
                ]
            });
            var result = joblint('he should have his head screwed on', options);
            assert.lengthEquals(result.issues, 2);
        });

        it('should ignore case when matching triggers', function () {
            options.rules.push({
                triggers: [
                    'HE|HIS'
                ]
            });
            var result = joblint('he should have his head screwed on', options);
            assert.lengthEquals(result.issues, 2);
        });

        it('should not partial-match words outside of the trigger\'s bounds', function () {
            options.rules.push({
                triggers: [
                    'he'
                ]
            });
            var result = joblint('she will have one hell of a time here', options);
            assert.lengthEquals(result.issues, 0);
        });

    });

    describe('result.issues', function () {

        describe('basics', function () {

            it('should include information about the rule that triggered the issue', function () {
                var rule = {
                    name: 'foo',
                    reason: 'bar',
                    solution: 'baz',
                    level: 'qux',
                    increment: {
                        foo: 1
                    },
                    triggers: [
                        'he'
                    ]
                };
                options.rules.push(rule);
                var result = joblint('he should have his head screwed on', options);
                assert.isObject(result.issues[0]);
                assert.strictEqual(result.issues[0].name, rule.name);
                assert.strictEqual(result.issues[0].reason, rule.reason);
                assert.strictEqual(result.issues[0].solution, rule.solution);
                assert.strictEqual(result.issues[0].level, rule.level);
                assert.deepEqual(result.issues[0].increment, rule.increment);
                assert.isUndefined(result.issues[0].triggers);
            });

            it('should include the exact occurance of the trigger word', function () {
                options.rules.push({
                    triggers: [
                        'he|his'
                    ]
                });
                var result = joblint('He should have HIS head screwed on if he wants this job', options);
                assert.strictEqual(result.issues[0].occurance, 'He');
                assert.strictEqual(result.issues[1].occurance, 'HIS');
                assert.strictEqual(result.issues[2].occurance, 'he');
            });

            it('should include the the position of the trigger word in the input text', function () {
                options.rules.push({
                    triggers: [
                        'he|his'
                    ]
                });
                var result = joblint('he should have his head screwed on if he wants this job', options);
                assert.strictEqual(result.issues[0].position, 0);
                assert.strictEqual(result.issues[1].position, 15);
                assert.strictEqual(result.issues[2].position, 38);
            });

        });

        describe('context', function () {

            it('should include the context of the trigger word', function () {
                options.rules.push({
                    triggers: [
                        'window'
                    ]
                });
                var result = joblint('How much is that doggie in the window? The one with the waggly tail. How much is that doggie in the window? I do hope that doggie\'s for sale.', options);
                assert.strictEqual(result.issues[0].context, '…that doggie in the {{occurance}}? The one with the…');
                assert.strictEqual(result.issues[1].context, '…that doggie in the {{occurance}}? I do hope that doggie\'s…');
            });

            it('should not include line-breaks in the context', function () {
                options.rules.push({
                    triggers: [
                        'much|window'
                    ]
                });
                var result = joblint('How much is that doggie in the window?\nThe one with the waggly tail.\nHow much is that doggie in the window?\nI do hope that doggie\'s for sale.', options);
                assert.strictEqual(result.issues[0].context, 'How {{occurance}} is that doggie in the window?');
                assert.strictEqual(result.issues[1].context, '…that doggie in the {{occurance}}?');
                assert.strictEqual(result.issues[2].context, 'How {{occurance}} is that doggie in the window?');
                assert.strictEqual(result.issues[3].context, '…that doggie in the {{occurance}}?');
            });

            it('should add ellipses to the context if there are more words either side on the line', function () {
                options.rules.push({
                    triggers: [
                        'trigger'
                    ]
                });
                var result = joblint('This is a longish line with trigger roughly in the middle so that we get ellipses.\nThis trigger is at the beginning of a longish line.\nThis is a longish line which has the trigger near the end.\nShort trigger line.', options);
                assert.strictEqual(result.issues[0].context, '…longish line with {{occurance}} roughly in the middle…');
                assert.strictEqual(result.issues[1].context, 'This {{occurance}} is at the beginning of a longish…');
                assert.strictEqual(result.issues[2].context, '…line which has the {{occurance}} near the end.');
                assert.strictEqual(result.issues[3].context, 'Short {{occurance}} line.');
            });

        });

    });

    describe('result.counts', function () {

        it('should include incremented values for all triggered rules', function () {
            options.rules.push({
                triggers: [
                    'he'
                ],
                increment: {
                    foo: 1
                }
            });
            options.rules.push({
                triggers: [
                    'his'
                ],
                increment: {
                    bar: 1
                }
            });
            var result = joblint('he should have his head screwed on if he wants this job', options);
            assert.strictEqual(result.counts.foo, 2);
            assert.strictEqual(result.counts.bar, 1);
        });

        it('should increment by the amount specified in the rule', function () {
            options.rules.push({
                triggers: [
                    'he'
                ],
                increment: {
                    foo: 2
                }
            });
            var result = joblint('he should have his head screwed on if he wants this job', options);
            assert.strictEqual(result.counts.foo, 4);
        });

        it('should decrement when negative increments are found', function () {
            options.rules.push({
                triggers: [
                    'he'
                ],
                increment: {
                    foo: 1
                }
            });
            options.rules.push({
                triggers: [
                    'his'
                ],
                increment: {
                    foo: -1
                }
            });
            var result = joblint('he should have his head screwed on if he wants this job', options);
            assert.strictEqual(result.counts.foo, 1);
        });

        it('should not decrement past 0 when negative increments are found', function () {
            options.rules.push({
                triggers: [
                    'he'
                ],
                increment: {
                    foo: -1
                }
            });
            options.rules.push({
                triggers: [
                    'his'
                ],
                increment: {
                    foo: 1
                }
            });
            var result = joblint('he should have his head screwed on if he wants this job', options);
            assert.strictEqual(result.counts.foo, 0);
        });

    });

});

