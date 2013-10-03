'use strict';

module.exports = defineRules;

var bubbleJobTitles = [
    /gurus?/,
    /ninjas?/,
    /rock\s*stars?/,
    /super\s*stars?/
];

var temptations = [
    /beers?/,
    /brewskis?/,
    /pints?/,
    /keg(?:erator)?s?/,
    /nerf guns?/,
    /ping\s*pong?/,
    /pizzas?/,
    /pool\s*table|pool/,
    /table\s*tennis/,
    'table football', 'foosball',
    'fifa',
    /rock\s*walls?/,
    /xbox(?:es|s)?/
];

function defineRules (linter) {

    // Job title fails
    linter.addRule({
        name: 'Job "Titles"',
        desc: 'Referring to tech people as Ninjas or similar devalues the work that they do and ' +
              'shows a lack of respect and professionalism. It\'s also rather cliched and can be ' +
              'an immediate turn-off to many people.',
        test: function (spec, result) {
            var bubbleJobMentions = spec.containsAnyOf(bubbleJobTitles);
            if (bubbleJobMentions.length > 0) {
                console.log(bubbleJobMentions);
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
            var temptationMentions = spec.containsAnyOf(temptations);
            if (temptationMentions.length > 0) {
                result.addWarning(
                    'Attempt to attract candidates with hollow benefits: ' +
                    temptationMentions.map(function (mentions) {
                        return Array.isArray(mentions) && mentions.join(', ') || mentions;
                    }).join(', ')
                );
                result.addCultureFailPoints(1);
                result.addRecruiterFailPoints(temptationMentions.length / 2);
            }
        }
    });

}
