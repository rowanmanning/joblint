/* global beforeEach, describe, it */
/* jshint maxlen: 200 */
'use strict';

var assert = require('proclaim');

describe('spec', function () {
    var createSpec;

    beforeEach(function () {
        createSpec = require('../../lib/spec');
    });

    it('should be a function', function () {
        assert.isFunction(createSpec);
    });

    describe('.call()', function () {
        var body, spec, words;

        beforeEach(function () {
            body = 'Foo-bar BAZ!_qux 123?';
            words = ['foo', 'bar', 'baz', 'qux', '123'];
            spec = createSpec(body);
        });

        it('should return an object', function () {
            assert.isObject(spec);
        });

        describe('[returned object]', function () {

            it('should have a body property (string) which matches the input body text', function () {
                assert.isString(spec.body);
                assert.strictEqual(spec.body, body);
            });

            it('should have a words property (array) which contains expected words', function () {
                assert.isArray(spec.words);
                assert.deepEqual(spec.words, words);
            });

            it('should have a containsWord method', function () {
                assert.isFunction(spec.containsWord);
            });

            describe('.containsWord()', function () {

                it('should return true if the spec contains the given word', function () {
                    assert.isTrue(spec.containsWord('foo'));
                    assert.isTrue(spec.containsWord('f o o'));
                });

                it('should return false if the spec does not contain the given word', function () {
                    assert.isFalse(spec.containsWord('hello'));
                });

            });

        });

    });

});
