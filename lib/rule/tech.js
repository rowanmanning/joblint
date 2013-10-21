'use strict';

module.exports = defineRules;

var legacyTech = [
    'cobol',
    'cvs',
    /front\s*page/,
    'rcs',
    'sccs',
    /source\s*safe/,
    /vb\s*6/,
    /visual\s*basic\s*6/,
    'vbscript'
];

var environments = [
    /bb\s*edit/,
    /dream\s*weaver/,
    'eclipse',
    'emacs',
    /net\s*beans/,
    /note\s*pad/,
    /sublime\s*text/,
    /text\s*wrangler/,
    /text\s*mate/,
    /vim?/,
    /visual\s*studio/
];

function defineRules (linter) {

    // Legacy technology
    linter.addRule({
        name: 'Legacy Technology',
        desc: 'Legacy technologies can reduce the number of people interested in a job. ' +
              'Sometimes we can\'t avoid this, but extreme legacy tech can often indicate that ' +
              'a company isn\'t willing to move forwards or invest in career development.',
        test: function (spec, result) {
            var legacyTechMentions = spec.containsAnyOf(legacyTech);
            if (legacyTechMentions.length > 0) {
                result.addNotice(
                    'Legacy technologies found: ' +
                    legacyTechMentions.join(', '),
                    legacyTechMentions
                );
                result.addTechFailPoints(legacyTechMentions.length);
                result.addRealismFailPoints(1);
            }
        }
    });

    // Prescribed environment
    linter.addRule({
        name: 'Prescribed Development Environment',
        desc: 'Unless you\'re building in a something which requires a certain development ' +
              'environment (e.g. iOS development and XCode), it shouldn\'t matter which tools a ' +
              'developer decides to use to write code – their output will be better if they are ' +
              'working in a familiar environment.',
        test: function (spec, result) {
            var environmentMentions = spec.containsAnyOf(environments);
            if (environmentMentions.length > 0) {
                result.addNotice(
                    'Development environment is prescribed: ' +
                    environmentMentions.join(', '),
                    environmentMentions
                );
                result.addTechFailPoints(environmentMentions.length);
                result.addCultureFailPoints(1);
            }
        }
    });

    // JavaScript fails
    linter.addRule({
        name: 'JavaScript',
        desc: 'JavaScript is one word. You write JavaScript, not javascripts or java script.',
        test: function (spec, result) {
            var javaScriptFails = spec.contains(/(java script|java\s*scripts)/);
            if (Array.isArray(javaScriptFails)) {
                result.addError(
                    'JavaScript is one word, and there\'s no "s" on the end',
                    javaScriptFails
                );
                result.addRecruiterFailPoints(javaScriptFails.length);
            }
        }
    });

    // Rails fails
    linter.addRule({
        name: 'Ruby On Rail',
        desc: 'Ruby On Rails is plural – there is more than one rail.',
        test: function (spec, result) {
            var railsFails = spec.contains('ruby on rail');
            if (Array.isArray(railsFails)) {
                result.addError(
                    'Ruby On Rails is plural – there is more than one rail.',
                    railsFails
                );
                result.addRecruiterFailPoints(railsFails.length);
            }
        }
    });

}
