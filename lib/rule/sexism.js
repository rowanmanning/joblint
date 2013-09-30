'use strict';

module.exports = defineRules;

var genderWords = [
    'boy', 'boys', 'bro', 'bros', 'guy', 'guys', 'male', 'man', 'men',
    'female', 'girl', 'girls', 'lady', 'ladies', 'woman', 'women', 'he',
    'she', 'his', 'her', 'him', 'chick', 'chicks', 'dude', 'dudes',
    'mom', 'dad', 'mother', 'mothers', 'father', 'fathers', 'wife', 'wives',
    'husband', 'husbands', 'grandma', 'grandmas', 'grandpa', 'grandpas', 
    'grandmother', 'grandmothers', 'granny', 'grannies', 'grandfather',
    'grandfathers', 'mum', 'mums', 'mommy', 'mommies', 'momma', 'mommas',
    'papa', 'papas', 'gentleman', 'gentlemen'
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
