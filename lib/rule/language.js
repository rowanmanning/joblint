'use strict';

module.exports = defineRules;

var swears = [
    'bloody',
    'bugger',
    'cunt',
    /fuck(?:er|ing)?/,
    /piss(?:ing)?/,
    'shit'
];

function defineRules (linter) {

    // Swears
    linter.addRule({
        name: 'Profanity',
        desc: 'While swearing in the workplace can be OK, you shouldn\'t be using profanity in a ' +
              'job spec – it\'s unprofessional.',
        test: function (spec, result) {
            var swearMentions = spec.containsAnyOf(swears);
            if (swearMentions.length > 0) {
                result.addWarning('Swearing in a job spec isn\'t very professional');
                result.addRecruiterFailPoints(swearMentions.length);
            }
        }
    });

}
