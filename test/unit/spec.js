/* global afterEach, beforeEach, describe, it */
/* jshint maxlen: 200 */
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');

describe('spec', function () {
    var createSpec, word;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        word = require('../mock/word');
        mockery.registerMock('./word', word);

        createSpec = require('../../lib/spec');
    });

    afterEach(function () {
        mockery.disable();
    });

    it('should be a function', function () {
        assert.isFunction(createSpec);
    });

    describe('.call()', function () {
        var body, spec, words;

        beforeEach(function () {
            body = 'Foo-bar BAZ!_qux 123?';
            words = ['foo', 'bar', 'baz', 'qux', '123'];
            word.normalizeWord.returnsArg(0);
            word.splitIntoWords.withArgs(body).returns(words);
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

            it('should have a words property (array) which is the result of splitIntoWords called on the body', function () {
                assert.isArray(spec.words);
                assert.strictEqual(spec.words, words);
            });

            it('should have a containsWord method', function () {
                assert.isFunction(spec.containsWord);
            });

            describe('.containsWord()', function () {

                it('should return true if the spec contains the given word', function () {
                    assert.isTrue(spec.containsWord('foo'));
                });

                it('should return false if the spec does not contain the given word', function () {
                    assert.isFalse(spec.containsWord('hello'));
                });

            });

        });

    });

});
