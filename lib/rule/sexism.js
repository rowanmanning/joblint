'use strict';

module.exports = defineRules;

function defineRules (linter) {

    linter.addRule(function (spec, result) {
        if (spec.containsWord('female') || spec.containsWord('male')) {
            result.addError('Gender is mentioned');
            result.addCultureFailPoints(1);
        }
    });

}
