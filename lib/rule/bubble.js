'use strict';

module.exports = defineRules;

var bubbleJobTitles = [
    'guru', 'gurus',
    'ninja', 'ninjas',
    'rock star', 'rock stars', 'rock stars', 'rockstar',
    'superstar', 'superstars'
];

var temptations = [
    'beer', 'beers', 'brewski', 'brewskis', 'pint', 'pints',
    'nerf gun', 'nerf guns',
    'ping pong', 'pingpong',
    'pizza', 'pizzas',
    'pool table', 'pool', 'pooltable',
    'table tennis', 'tabletennis',
    'table football', 'foosball'
];

function defineRules (linter) {

    // Job title fails
    linter.addRule(function (spec, result) {
        var bubbleJobMentions = spec.containsAnyOfPhrases(bubbleJobTitles);
        if (bubbleJobMentions.length > 0) {
            result.addWarning('Tech people are not ninjas, rock stars, gurus or superstars');
            result.addCultureFailPoints(bubbleJobMentions.length / 2);
            result.addRealismFailPoints(1);
        }
    });

    // Temptations
    linter.addRule(function (spec, result) {
        var temptationMentions = spec.containsAnyOfPhrases(temptations);
        if (temptationMentions.length > 0) {
            result.addWarning(
                'Attempt to attract candidates with hollow benefits: ' +
                temptationMentions.join(', ')
            );
            result.addCultureFailPoints(1);
            result.addRecruiterFailPoints(temptationMentions.length / 2);
        }
    });

}
