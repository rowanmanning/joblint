'use strict';

var createLinter = require('./linter');

module.exports = joblint;

function joblint (body, rules) {
    var linter = createLinter();
    injectRulesIntoLinter(linter);
    if (Array.isArray(rules)) {
        for (var i = rules.length - 1; i >= 0; i -= 1) {
            rules[i](linter);
        }
    } else if (typeof rules === 'function') {
        rules(linter);
    }
    return linter.lint(body);
}

function injectRulesIntoLinter (linter) {
    require('./rule/bro-culture')(linter);
    require('./rule/bubble')(linter);
    require('./rule/expectations')(linter);
    require('./rule/language')(linter);
    require('./rule/sexism')(linter);
    require('./rule/tech')(linter);
}
