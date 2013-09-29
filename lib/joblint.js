'use strict';

var createLinter = require('./linter');

module.exports = joblint;

function joblint (body) {
    var linter = createLinter();
    injectRulesIntoLinter(linter);
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
