'use strict';

module.exports = defineRules;

var bubbleJobTitles = [
    /gurus?/,
    /hero(:?es)/,
    /ninjas?/,
    /rock\s*stars?/,
    /super\s*stars?/
];

var temptations = [
    /ales?/,
    /beers?/,
    /brewskis?/,
    'coffee',
    'foosball',
    /happy\s*hours?/,
    /keg(?:erator)?s?/,
    /lagers?/,
    /nerf\s*guns?/,
    /ping\s*pong?/,
    /pints?/,
    /pizzas?/,
    /play\s*stations?/,
    /pool\s*table|pool/,
    /rock\s*walls?/,
    'table football',
    /table\s*tennis/,
    /wiis?/,
    /xbox(?:es|s)?/,
    /massages?/
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
                result.addWarning(
                    'Tech people are not ninjas, rock stars, gurus or superstars',
                    bubbleJobMentions
                );
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
                    temptationMentions.join(', '),
                    temptationMentions
                );
                result.addCultureFailPoints(1);
                result.addRecruiterFailPoints(temptationMentions.length / 2);
            }
        }
    });

}
