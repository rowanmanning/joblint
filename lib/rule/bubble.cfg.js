var config =
    [
        {
            'matchingRegexArray' : [ /gurus?/, /hero(:?es)/, /ninjas?/,
                                     /rock\s*stars?/, /super\s*stars?/ ],
            'name' : 'Job \'Titles\'',
            'desc' : 'Referring to tech people as Ninjas or similar devalues' +
                     'the work that they do and shows a lack of respect and' +
                     'professionalism. It\'s also rather cliched and can be' +
                     'an immediate turn-off to many people.',
            'warning' : 'Tech people are not ninjas, rock stars, gurus or superstars',
            'displayOccurrences' : false,
            'error' : [ {
                'errorFunction' : 'addCultureFailPoints',
                'countOccurrences' : true
            }, {
                'errorFunction' : 'addRealismFailPoints',
                'countOccurrences' : false
            } ]
        },
        {
            'matchingRegexArray' : [ /ales?/, /beers?/, /brewskis?/, 'coffee',
                                     'foosball', /keg(?:erator)?s?/, /lagers?/,
                                     /nerf\s*guns?/, /ping\s*pong?/, /pints?/,
                                     /pizzas?/, /play\s*stations?/, /wiis?/,
                                     /pool\s*table|pool/, /rock\s*walls?/,
                                     'table football', /table\s*tennis/,
                                     /xbox(?:es|s)?/, /massages?/ ],
            'name' : 'Hollow Benefits',
            'desc' : 'Benefits such as \'beer fridge\' and \'pool table\' are' +
                     'not bad in themselves, but their appearance in a job' +
                     'spec often disguises the fact that there are few real' +
                     'benefits to working for a company. Be wary of these.',
            'warning' : 'Attempt to attract candidates with hollow benefits: ',
            'displayOccurrences' : true,
            'error' : [ {
                'errorFunction' : 'addCultureFailPoints',
                'countOccurrences' : false
            }, {
                'errorFunction' : 'addRecruiterFailPoints',
                'countOccurrences' : true
            } ]
        }
    ];

module.exports = config;