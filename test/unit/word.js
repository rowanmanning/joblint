/* global beforeEach, describe, it */
/* jshint maxlen: 200 */
'use strict';

var assert = require('proclaim');

describe('word', function () {
    var word;

    beforeEach(function () {
        word = require('../../lib/word');
    });

    it('should be an object', function () {
        assert.isObject(word);
    });

    it('should have a normalizeWord method', function () {
        assert.isFunction(word.normalizeWord);
    });

    it('should have a splitIntoWords method', function () {
        assert.isFunction(word.splitIntoWords);
    });

    describe('.normalizeWord()', function () {

        it('should normalize words as expected', function () {
            assert.strictEqual(word.normalizeWord('foo'), 'foo');
            assert.strictEqual(word.normalizeWord('FOO'), 'foo');
            assert.strictEqual(word.normalizeWord('FOO!'), 'foo');
            assert.strictEqual(word.normalizeWord('f o o'), 'foo');
            assert.strictEqual(word.normalizeWord('::!FOO!::'), 'foo');
        });

    });

    describe('.splitIntoWords()', function () {

        it('should split and normalize words as expected', function () {
            var body = 'Foo-bar BAZ!_qux 123?';
            var words = ['foo', 'bar', 'baz', 'qux', '123'];
            assert.deepEqual(word.splitIntoWords(body), words);
        });

    });

});
