'use strict';

module.exports = defineRules;
var rules = require(pathToConfigFile());

function defineRules(linter) {
    rules.forEach(function(rule) {
                linter.addRule({
                    name : rule.name,
                    desc : rule.desc,
                    test : function(spec, result) {
                        var occurrences = spec
                                .containsAnyOf(rule.matchingRegexArray);
                        if (occurrences.length > 0) {
                            var _warning = rule.displayOccurences ?
                                    rule.warning + occurrences.join(', ')
                                    : rule.warning;
                            result.addWarning(_warning, occurrences);
                            rule.error
                                    .forEach(function(err) {
                                        var _param = err.countOccurrences ?
                                                occurrences.length / 2
                                                : 1;
                                        result[err.errorFunction](_param);
                                    });
                        }
                    }
                });
            });

}

function pathToConfigFile() {
    var path = __filename.split('.');
    path[path.length] = path[path.length-1];
    path[path.length-2] = 'cfg';
    return path.join('.');
}