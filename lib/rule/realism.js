'use strict';

module.exports = defineRules;

var visionaryWords = [
    /blue\s*sk(?:y|ies)/,
    /enlighten(?:ed|ing)?/,
    /green\s*fields?/,
    /incentivi[sz]e/,
    'paradigm',
    /producti[sz]e/,
    /reach(?:ed|ing) out/,
    /synerg(?:y|ize|ise)/,
    /visionar(?:y|ies)/
];

function defineRules (linter) {

    // Visionary terminology
    linter.addRule({
        name: 'Visionary Terminology',
        desc: 'Terms like "blue sky" and "enlightened" often indicate that a non technical ' +
              'person (perhaps a CEO or stakeholder) has been involved in writing the spec. Be ' +
              'down-to-earth, and explain things in plain English.',
        test: function (spec, result) {
            var visionaryMentions = spec.containsAnyOf(visionaryWords);
            var amount = (visionaryMentions.length > 2 ? 'Lots of' : 'Some');
            if (visionaryMentions.length > 0) {
                result.addWarning(
                    amount + ' "visionary" terminology is used',
                    visionaryMentions
                );
                result.addCultureFailPoints(visionaryMentions.length / 2);
                result.addRealismFailPoints(visionaryMentions.length / 2);
            }
        }
    });

}
