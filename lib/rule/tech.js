'use strict';

module.exports = defineRules;

var legacyTech = [
    'cobol', 'cvs', 'frontpage', 'sourcesafe', 'vb6', 'vbscript'
];

var environments = [
    'bbedit', 'dreamweaver', 'eclipse', 'emacs', 'netbeans', 'notepad', 'sublime text',
    /text\s*wrangler/,
    'textmate',
    /vim?/,
    'visual studio'
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
                    legacyTechMentions.join(', ')
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
                    environmentMentions.join(', ')
                );
                result.addTechFailPoints(environmentMentions.length);
                result.addCultureFailPoints(1);
            }
        }
    });

}
