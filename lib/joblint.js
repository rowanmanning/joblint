'use strict';

var createLinter = require('./linter');

module.exports = joblint;

function joblint (body) {
    var linter = createLinter();
    injectRulesIntoLinter(linter);
    return linter.lint(body);
}

function injectRulesIntoLinter (linter) {
    require('./rule/sexism')(linter);
}
