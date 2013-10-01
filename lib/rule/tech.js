'use strict';

module.exports = defineRules;

var legacyTech = [
    'cobol', 'cold fusion', 'cvs', 'frontpage', 'sourcesafe', 'vb6', 'vbscript', 'php'
];

var environments = [
    'bbedit', 'dreamweaver', 'eclipse', 'emacs', 'netbeans', 'notepad', 'sublime text',
    'text wrangler', 'textmate', 'textwrangler', 'vi', 'vim', 'visual studio'
];

function defineRules (linter) {

    // Legacy technology
    linter.addRule(function (spec, result) {
        var legacyTechMentions = spec.containsAnyOfWords(legacyTech);
        if (legacyTechMentions.length > 0) {
            result.addNotice(
                'Legacy technologies found: ' +
                legacyTechMentions.join(', ')
            );
            result.addTechFailPoints(legacyTechMentions.length);
            result.addRealismFailPoints(1);
        }
    });

    // Prescribed environment
    linter.addRule(function (spec, result) {
        var environmentMentions = spec.containsAnyOfPhrases(environments);
        if (environmentMentions.length > 0) {
            result.addNotice(
                'Development environment is prescribed: ' +
                environmentMentions.join(', ')
            );
            result.addTechFailPoints(environmentMentions.length);
            result.addCultureFailPoints(1);
        }
    });

}
