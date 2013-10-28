'use strict';

module.exports = defineRules;

var regexArray = [];

regexArray.bubbleJobTitles = [ /gurus?/, /hero(:?es)/, /ninjas?/, /rock\s*stars?/,
        /super\s*stars?/ ];

regexArray.temptations = [ /ales?/, /beers?/, /brewskis?/, 'coffee', 'foosball',
        /keg(?:erator)?s?/, /lagers?/, /nerf\s*guns?/, /ping\s*pong?/,
        /pints?/, /pizzas?/, /play\s*stations?/, /pool\s*table|pool/,
        /rock\s*walls?/, 'table football', /table\s*tennis/, /wiis?/,
        /xbox(?:es|s)?/, /massages?/ ];

// File containing rules has the same name, but json extension instead of js
var file = __filename + 'on';
var rules = require(file);

function defineRules(linter) {
    rules.forEach(function(rule) {
                linter.addRule({
                    name : rule.name,
                    desc : rule.desc,
                    test : function(spec, result) {
                        var occurrences = spec
                                .containsAnyOf(regexArray[rule.matchingRegexArray]);
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
