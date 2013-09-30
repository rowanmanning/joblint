'use strict';

module.exports = defineRules;

var genderWords = [
    'boy', 'boys', 'bro', 'bros', 'guy', 'guys', 'male', 'man', 'men',
    'female', 'girl', 'girls', 'lady', 'ladies', 'woman', 'women',
    'chick', 'chicks', 'dude', 'dudes'
];

function defineRules (linter) {

    // Gender mentions
    linter.addRule(function (spec, result) {
        var genderMentions = spec.containsAnyOfWords(genderWords);
        if (genderMentions.length > 0) {
            result.addError('Gender is mentioned');
            result.addCultureFailPoints(genderMentions.length / 2);
        }
    });

}
