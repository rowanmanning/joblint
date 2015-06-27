// jshint maxstatements: false
// jscs:disable disallowMultipleVarDecl, maximumLineLength
'use strict';

var mockery = require('mockery');

beforeEach(function () {
    mockery.enable({
        useCleanCache: true,
        warnOnUnregistered: false,
        warnOnReplace: false
    });
});

afterEach(function () {
    mockery.deregisterAll();
    mockery.disable();
});
