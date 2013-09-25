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
        var spec;

        beforeEach(function () {
            spec = createSpec('foo bar baz qux');
        });

        it('should return an object', function () {
            assert.isObject(spec);
        });

        describe('[returned object]', function () {

            it('should have a body property (string) which matches the input body text', function () {
                assert.isString(spec.body);
                assert.strictEqual(spec.body, 'foo bar baz qux');
            });

        });

    });

});
