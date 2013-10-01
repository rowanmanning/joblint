'use strict';

module.exports = defineRules;

var competitivePhrases = [
    'compete', 'competition', 'cutting edge', 'fail', 'forefront',
    'superstar', 'the best', 'top', 'win'
];

// TODO: re-add 'competitive' above when RegExp rules are in

var expectationPhrases = [
    'hit the ground running',
    'juggle',
    'tight deadline', 'tight deadlines'
];

function defineRules (linter) {

    // Competitive environment
    linter.addRule({
        name: 'Competitive Environment',
        desc: 'Competition can be healthy, but for a lot of people a heavily competitive ' +
              'environment can be a strain. You could also potentially be excluding people who ' +
              'have more important outside-of-work commitments, such as a family.',
        test: function (spec, result) {
            var competitionMentions = spec.containsAnyOfPhrases(competitivePhrases);
            if (competitionMentions.length > 0) {
                result.addNotice('The job sounds competitive and performance-based');
                result.addRealismFailPoints(competitionMentions.length / 2);
                result.addRecruiterFailPoints(competitionMentions.length / 2);
            }
        }
    });

    // Unrealistic expectations
    linter.addRule({
        name: 'New Starter Expectations',
        desc: 'Terms like "hit the ground running" and others can indicate that the person ' +
              'writing a job spec is unaware of the time and effort involved in preparing a new ' +
              'starter for work.',
        test: function (spec, result) {
            var expectationMentions = spec.containsAnyOfPhrases(expectationPhrases);
            if (expectationMentions.length > 0) {
                result.addNotice('The job sounds like it\'s expecting too much from a new starter');
                result.addRealismFailPoints(expectationMentions.length);
            }
        }
    });

}
