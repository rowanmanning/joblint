'use strict';

module.exports = defineRules;

var broWords = [
    'bro', 'bros',
    'crank',
    'crush',
    'skillz'
];

function defineRules (linter) {

    // Bro terminology
    linter.addRule(function (spec, result) {
        var broMentions = spec.containsAnyOfWords(broWords);
        var amount = (broMentions.length > 2 ? 'Lots of' : 'Some');
        if (broMentions.length > 0) {
            result.addWarning(amount + ' "bro culture" terminology is used');
            result.addCultureFailPoints(broMentions.length);
        }
    });

}
