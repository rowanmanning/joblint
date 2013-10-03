'use strict';

module.exports = defineRules;

var genderWords = [
    'boy', 'boys', 'bro', 'bros', 'guy', 'guys', 'male', 'man', 'men',
    'female', 'girl', 'girls', 'lady', 'ladies', 'woman', 'women',
    'chick', 'chicks', 'dude', 'dudes'
];

var sexualizedWords = [
    'sexy', 'hawt', 'phat'
];

function defineRules (linter) {

    // Gender mentions
    linter.addRule({
        name: 'Gender Mention',
        desc: 'Mentioning gender in a job spec not only limits the number of people likely to ' +
              'be interested, but can also have legal implications – it is often discriminatory. ' +
              'Check your use of gender-specific terms.',
        test: function (spec, result) {
            var genderMentions = spec.containsAnyOfWords(genderWords);
            if (genderMentions.length > 0) {
                result.addError('Gender is mentioned');
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
            var sexualizedMentions = spec.containsAnyOfWords(sexualizedWords);
            if (sexualizedMentions.length > 0) {
                result.addWarning(
                    'Job uses sexualized terms: ' +
                    sexualizedMentions.join(', ')
                );
                result.addCultureFailPoints(sexualizedMentions.length / 2);
            }
        }
    });

}
