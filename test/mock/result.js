'use strict';

var sinon = require('sinon');

module.exports = sinon.stub();

module.exports = sinon.spy(function () {
    return {
        setCurrentRule: sinon.stub(),
        clearCurrentRule: sinon.stub()
    };
});
