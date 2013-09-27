'use strict';

module.exports = defineRules;

function defineRules (linter) {

    linter.addRule(function (spec, result) {
        if (spec.containsWord('female') || spec.containsWord('male')) {
            result.addError('Job spec mentions gender');
            result.addCultureFailPoints(1);
        }
    });

}
