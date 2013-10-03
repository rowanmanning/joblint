'use strict';

module.exports = defineRules;

var broWords = [
    /bros?/,
    'crank',
    'crush',
    /dude(?:bro)?s?/,
    'skillz'
];

function defineRules (linter) {

    // Bro terminology
    linter.addRule({
        name: 'Bro Terminology',
        desc: 'Bro culture terminology can really reduce the number of people likely to show ' +
              'interest, both male and female. It discrimintates against anyone who doesn\'t fit ' +
              'into a single gender-specific archetype.',
        test: function (spec, result) {
            var broMentions = spec.containsAnyOf(broWords);
            var amount = (broMentions.length > 2 ? 'Lots of' : 'Some');
            if (broMentions.length > 0) {
                result.addWarning(amount + ' "bro culture" terminology is used');
                result.addCultureFailPoints(broMentions.length);
            }
        }
    });

}
