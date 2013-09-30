'use strict';

module.exports = defineRules;

var genderWords = [
    /boys?/,
    /bros?/,
    /chicks?/,
    /dudes?/,
    /females?/,
    /guys?/,
    /girls?/,
    /lad(?:y|ies)/,
    /males?/,
    /m[ae]n/,
    /wom[ae]n/,
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
