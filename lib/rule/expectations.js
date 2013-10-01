'use strict';

module.exports = defineRules;

var competitivePhrases = [
    'compete', 'competition', 'competitive', 'cutting edge', 'fail', 'forefront',
    'superstar', 'the best', 'top', 'win'
];

var expectationPhrases = [
    'hit the ground running',
    'juggle',
    'tight deadline', 'tight deadlines'
];

function defineRules (linter) {

    // Competitive environment
    linter.addRule(function (spec, result) {
        var competitionMentions = spec.containsAnyOfPhrases(competitivePhrases);
        if (competitionMentions.length > 0) {
            result.addNotice('The job sounds competitive and performance-based');
            result.addRealismFailPoints(competitionMentions.length / 2);
            result.addRecruiterFailPoints(competitionMentions.length / 2);
        }
    });

    // Unrealistic expectations
    linter.addRule(function (spec, result) {
        var expectationMentions = spec.containsAnyOfPhrases(expectationPhrases);
        if (expectationMentions.length > 0) {
            result.addNotice('The job sounds like it\'s expecting too much from a new starter');
            result.addRealismFailPoints(expectationMentions.length);
        }
    });

}
