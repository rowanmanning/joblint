'use strict';

module.exports = defineRules;

var competitivePhrases = [
    'compete(?!nt|nce|ncy|ncies)',
    'competition',
    /competitive(?!\ssalary|\spay)/,
    'cutting edge',
    'fail',
    /fore\s*front/,
    /super\s*stars?/,
    'the best',
    'top',
    'win'
];

var expectationPhrases = [
    'hit the ground running',
    'juggle',
    /tight deadlines?/
];

var meritocraticPhrases = [
    'meritocracy'
];

function defineRules (linter) {

    // Competitive environment
    linter.addRule({
        name: 'Competitive Environment',
        desc: 'Competition can be healthy, but for a lot of people a heavily competitive ' +
              'environment can be a strain. You could also potentially be excluding people who ' +
              'have more important outside-of-work commitments, such as a family.',
        test: function (spec, result) {
            var competitionMentions = spec.containsAnyOf(competitivePhrases);
            if (competitionMentions.length > 0) {
                result.addNotice(
                    'The job sounds competitive and performance-based',
                    competitionMentions
                );
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
            var expectationMentions = spec.containsAnyOf(expectationPhrases);
            if (expectationMentions.length > 0) {
                result.addNotice(
                    'The job sounds like it\'s expecting too much from a new starter',
                    expectationMentions
                );
                result.addRealismFailPoints(expectationMentions.length);
            }
        }
    });


    // Meritocracy
    linter.addRule({
        name: 'Meritocracy',
        desc: 'The term "meritocracy" is originally a satirical term relating to how we justify ' +
              'our own successes. Unfortunately, it\'s probably impossible to objectively ' +
              'measure merit, so this usually indicates that the company in question rewards ' +
              'people similar to themselves or using specious metrics.',
        test: function (spec, result) {
            var meritMentions = spec.containsAnyOf(meritocraticPhrases);
            if (meritMentions.length > 0) {
                result.addNotice(
                    'The job mentions meritocracy',
                    meritMentions
                );
                result.addRealismFailPoints(meritMentions.length);
            }
        }
    });
}
