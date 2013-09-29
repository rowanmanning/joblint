/* jshint maxstatements: false, maxlen: false */
/* global afterEach, beforeEach, describe, it */
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
            word.splitIntoWords.withArgs('foo').returns(['foo']);
            word.splitIntoWords.withArgs('foo bar').returns(['foo', 'bar']);
            word.splitIntoWords.withArgs('bar baz').returns(['bar', 'baz']);
            word.splitIntoWords.withArgs('hello').returns(['hello']);
            word.splitIntoWords.withArgs('hello world').returns(['hello', 'world']);
            word.splitIntoWords.withArgs('bar foo').returns(['bar', 'foo']);

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

            it('should have a containsPhrase method', function () {
                assert.isFunction(spec.containsPhrase);
            });

            it('should have a containsAnyOfWords method', function () {
                assert.isFunction(spec.containsAnyOfWords);
            });

            it('should have a containsAnyOfPhrases method', function () {
                assert.isFunction(spec.containsAnyOfPhrases);
            });

            describe('.containsWord()', function () {

                it('should return true if the spec contains the given word', function () {
                    assert.isTrue(spec.containsWord('foo'));
                });

                it('should return false if the spec does not contain the given word', function () {
                    assert.isFalse(spec.containsWord('hello'));
                });

            });

            describe('.containsPhrase()', function () {

                it('should return true if the spec contains the given phrase', function () {
                    assert.isTrue(spec.containsPhrase('foo'));
                    assert.isTrue(spec.containsPhrase('bar baz'));
                });

                it('should return false if the spec does not contain the given phrase', function () {
                    assert.isFalse(spec.containsPhrase('hello'));
                    assert.isFalse(spec.containsPhrase('hello world'));
                    assert.isFalse(spec.containsPhrase('bar foo'));
                });

            });

            describe('.containsAnyOfWords()', function () {

                it('should return an array of contained words', function () {
                    assert.deepEqual(spec.containsAnyOfWords(['foo', 'hello', 'bar']), ['foo', 'bar']);
                });

                it('should return an empty array if none of the words are found', function () {
                    assert.deepEqual(spec.containsAnyOfWords(['hello', 'world']), []);
                });

            });

            describe('.containsAnyOfPhrases()', function () {

                it('should return an array of contained phrases', function () {
                    assert.deepEqual(spec.containsAnyOfPhrases(['foo bar', 'bar baz', 'hello world']), ['foo bar', 'bar baz']);
                });

                it('should return an empty array if none of the phrases are found', function () {
                    assert.deepEqual(spec.containsAnyOfPhrases(['bar foo', 'hello world']), []);
                });

            });

        });

    });

});
