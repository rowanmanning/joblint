'use strict';

var createResult = require('./result');
var createSpec = require('./spec');

module.exports = createLinter;

function createLinter () {
    return new Linter();
}

function Linter () {
    this.rules = [];
}

Linter.prototype.addRule = function (rule) {
    this.rules.push(rule);
};

Linter.prototype.lint = function (body) {
    var spec = createSpec(body);
    var result = createResult();
    this.rules.forEach(function (rule) {
        result.setCurrentRule(rule);
        rule.test(spec, result);
    });
    result.clearCurrentRule();
    return result;
};
