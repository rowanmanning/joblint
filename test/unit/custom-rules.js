/* jshint maxstatements: false, maxlen: false */
/* global describe, it */
'use strict';

var assert = require('proclaim');
var joblint = require('../../lib/joblint');

describe('custom rules', function () {
    it('should be possible to add at linter creation', function (done) {
        joblint('hello world', function (linter) {
            assert.ok(linter);
            assert.isFunction(linter.addRule);
            done();
        });
    });
    it('should be possible to add multiple ad linter creation', function () {
        var added = 0;

        function inc(linter) {
            assert.ok(linter);
            assert.isFunction(linter.addRule);
            added += 1;
        }

        joblint('hello world', [ inc, inc, inc, inc ]);
        assert.equal(added, 4);
    });
});
