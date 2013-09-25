'use strict';

module.exports = defineRules;

function defineRules (linter) {

    linter.addRule(function (spec, result) {
        result.addError('There are no proper rules!');
    });

}
