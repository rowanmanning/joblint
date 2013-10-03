'use strict';

module.exports = defineRules;

var bubbleJobTitles = [
    'hero', 'heroes',
    'guru', 'gurus',
    'ninja', 'ninjas',
    'rock star', 'rockstars', 'rock stars', 'rockstar',
    'superstar', 'superstars'
];

var temptations = [
    'beer', 'beers', 'brewski', 'brewskis', 'pint', 'pints',
    'happyhour', 'happy hour',
    'keg', 'kegs', 'kegerator', 'kegerators',
    'nerf gun', 'nerf guns',
    'ping pong', 'pingpong',
    'pizza', 'pizzas',
    'pool table', 'pool', 'pooltable',
    'table tennis', 'tabletennis',
    'table football', 'foosball',
    'fifa', 'xbox', 'rock wall',
    'coffee',
];

function defineRules (linter) {

    // Job title fails
    linter.addRule({
        name: 'Job "Titles"',
        desc: 'Referring to tech people as Ninjas or similar devalues the work that they do and ' +
              'shows a lack of respect and professionalism. It\'s also rather cliched and can be ' +
              'an immediate turn-off to many people.',
        test: function (spec, result) {
            var bubbleJobMentions = spec.containsAnyOfPhrases(bubbleJobTitles);
            if (bubbleJobMentions.length > 0) {
                result.addWarning('Tech people are not ninjas, rock stars, gurus or superstars');
                result.addCultureFailPoints(bubbleJobMentions.length / 2);
                result.addRealismFailPoints(1);
            }
        }
    });

    // Temptations
    linter.addRule({
        name: 'Hollow Benefits',
        desc: 'Benefits such as "beer fridge" and "pool table" are not bad in themselves, but ' +
              'their appearance in a job spec often disguises the fact that there are few real ' +
              'benefits to working for a company. Be wary of these.',
        test: function (spec, result) {
            var temptationMentions = spec.containsAnyOfPhrases(temptations);
            if (temptationMentions.length > 0) {
                result.addWarning(
                    'Attempt to attract candidates with hollow benefits: ' +
                    temptationMentions.join(', ')
                );
                result.addCultureFailPoints(1);
                result.addRecruiterFailPoints(temptationMentions.length / 2);
            }
        }
    });

}
