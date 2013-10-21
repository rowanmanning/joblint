'use strict';

module.exports = defineRules;

var genderWords = [
    /boys?/,
    /bros?/,
    /broth(a|er)s?/,
    /chicks?/,
    /dads?/,
    /dudes?/,
    /fathers?/,
    /females?/,
    /gentlem[ae]n/,
    /girls?/,
    /grandfathers?/,
    /grandmas?/,
    /grandmothers?/,
    /grandpas?/,
    /grann(?:y|ies)/,
    /guys?/,
    /husbands?/,
    /lad(?:y|ies)/,
    /m[ae]n/,
    /m[ou]ms?/,
    /males?/,
    /momm(?:y|ies)/,
    /mommas?/,
    /mothers?/,
    /papas?/,
    /sist(a|er)s?/,
    /wi(?:fe|ves)/,
    /wom[ae]n/
];

var femaleGenderedPronouns = [
    'she',
    'her'
];
var maleGenderedPronouns = [
    'he',
    'his',
    'him'
];

var beardyWords = [
    /beard(ed|s|y)?/,
    /grizzl(ed|y)/
];

var sexualizedWords = [
    'sexy',
    'hawt',
    'phat'
];

function defineRules (linter) {

    // Gender mentions
    linter.addRule({
        name: 'Gender Mention',
        desc: 'Mentioning gender in a job spec not only limits the number of people likely to ' +
              'be interested, but can also have legal implications – it is often discriminatory. ' +
              'Check your use of gender-specific terms.',
        test: function (spec, result) {
            var genderMentions = spec.containsAnyOf(genderWords);
            if (genderMentions.length > 0) {
                result.addError(
                    'Gender is mentioned',
                    genderMentions
                );
                result.addCultureFailPoints(genderMentions.length / 2);
            }
        }
    });

    // Gendered pronouns
    linter.addRule({
        name: 'Gendered Pronouns',
        desc: 'Inbalanced use of "him/his/her" or "he/she" could indicate that you\'re ' +
              'discriminating against a certain gender. Revise your use of these words to be ' +
              'sure, or replace them with "them" or "they".',
        test: function (spec, result) {
            var femaleMentions = spec.containsAnyOf(femaleGenderedPronouns);
            var maleMentions = spec.containsAnyOf(maleGenderedPronouns);
            var allMentions = femaleMentions.concat(maleMentions);
            if (femaleMentions.length !== maleMentions.length) {
                result.addWarning(
                    'Gendered pronouns are used and mismatched: ' + allMentions.join(', '),
                    allMentions
                );
            }
        }
    });

    // Facial hair mentions
    linter.addRule({
        name: 'Facial Hair Mention',
        desc: 'The use of "grizzled" or "bearded" indicates that you\'re only looking for ' +
              'male developers.',
        test: function (spec, result) {
            var beardyMentions = spec.containsAnyOf(beardyWords);
            if (beardyMentions.length > 0) {
                result.addError(
                    'Facial hair is mentioned',
                    beardyMentions
                );
                result.addCultureFailPoints(beardyMentions.length);
            }
        }
    });

    // Sexualized terms
    linter.addRule({
        name: 'Sexualized Terms',
        desc: 'Terms like "sexy code" are often used if the person writing a spec doesn\'t know ' +
              'what they are talking about or can\'t articulate what good code is. It can also ' +
              'be an indicator of bro culture.',
        test: function (spec, result) {
            var sexualizedMentions = spec.containsAnyOf(sexualizedWords);
            if (sexualizedMentions.length > 0) {
                result.addWarning(
                    'Job uses sexualized terms: ' +
                    sexualizedMentions.join(', '),
                    sexualizedMentions
                );
                result.addCultureFailPoints(sexualizedMentions.length / 2);
            }
        }
    });

}
