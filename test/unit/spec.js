/* jshint maxstatements: false, maxlen: false */
/* global beforeEach, describe, it */
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
        var spec;

        beforeEach(function () {
            spec = createSpec('Foo-bar BAZ!_qux 123? food');
        });

        it('should return an object', function () {
            assert.isObject(spec);
        });

        describe('[returned object]', function () {

            it('should have a contains method', function () {
                assert.isFunction(spec.contains);
            });

            it('should have a containsAnyOf method', function () {
                assert.isFunction(spec.containsAnyOf);
            });

            describe('.contains()', function () {

                it('should return an array of matches if the spec contains the given phrase', function () {
                    assert.deepEqual(spec.contains('foo'), ['foo']);
                    assert.deepEqual(spec.contains('FOO'), ['foo']);
                    assert.deepEqual(spec.contains('bar baz'), ['bar baz']);
                    assert.deepEqual(spec.contains(/foo/), ['foo']);
                    assert.deepEqual(spec.contains(/FOO/), ['foo']);
                    assert.deepEqual(spec.contains(/food?/), ['foo', 'food']);
                    assert.deepEqual(spec.contains(/foo bar/), ['foo bar']);
                });

                it('should return null if the spec does not contain the given phrase', function () {
                    assert.isNull(spec.contains('hello'));
                    assert.isNull(spec.contains('hello world'));
                    assert.isNull(spec.contains('bar foo'));
                    assert.isNull(spec.contains(/hello/));
                    assert.isNull(spec.contains(/hello world/));
                    assert.isNull(spec.contains(/bar foo/));
                });

            });

            describe('.containsAnyOf()', function () {

                it('should return an array of contained phrases', function () {
                    assert.deepEqual(
                        spec.containsAnyOf(['foo', 'foo', 'foo bar', 'bar baz', 'hello world']),
                        ['foo', 'foo bar', 'bar baz']
                    );
                    assert.deepEqual(
                        spec.containsAnyOf(['foo', /foo/, /foo bar/, 'bar baz', /hello world/]),
                        ['foo', 'foo bar', 'bar baz']
                    );
                });

                it('should return an empty array if none of the phrases are found', function () {
                    assert.deepEqual(spec.containsAnyOf(['bar foo', 'hello world']), []);
                });

            });

        });

    });

});
