'use strict';

module.exports = defineRules;

var genderWords = [
    'boy', 'boys', 'bro', 'bros', 'guy', 'guys', 'male', 'man', 'men',
    'female', 'girl', 'girls', 'lady', 'ladies', 'woman'
];

function defineRules (linter) {

    linter.addRule(function (spec, result) {
        var genderMentions = spec.containsAnyOfWords(genderWords).length;
        if (genderMentions > 0) {
            result.addError('Gender is mentioned');
            result.addCultureFailPoints(Math.max(genderMentions / 2, 1));
        }
    });

}
