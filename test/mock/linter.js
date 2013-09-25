'use strict';

var sinon = require('sinon');

module.exports = sinon.spy(function () {
    var mockResult = {};
    return {
        addRule: sinon.stub(),
        lint: sinon.stub().returns(mockResult),
        mockResult: mockResult
    };
});
