'use strict';

module.exports = defineRules;

var swears = ['bloody', 'bugger', 'cunt', 'fuck', 'fucker', 'fucking', 'piss', 'pissing', 'shit'];

function defineRules (linter) {

    // Swears
    linter.addRule(function (spec, result) {
        var swearMentions = spec.containsAnyOfWords(swears);
        if (swearMentions.length > 0) {
            result.addWarning('Swearing in a job spec isn\'t very professional');
            result.addRecruiterFailPoints(swearMentions.length);
        }
    });

}
