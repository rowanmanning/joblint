// jscs:disable maximumLineLength
'use strict';

module.exports = [

    // Use of gendered word
    {
        name: 'Use of gendered word',
        reason: 'Use of gendered words could indicate that you\'re discriminating in favour of a certain gender.',
        solution: 'Replace gendered words with gender-neutral alternatives.',
        level: 'error',
        increment: {
            sexism: 1
        },
        triggers: [
            'boys?',
            'bros?',
            'broth(a|er)s?',
            'chicks?',
            'dads?',
            'dudes?',
            'fathers?',
            'females?',
            'gentlem[ae]n',
            'girls?',
            'grandfathers?',
            'grandmas?',
            'grandmothers?',
            'grandpas?',
            'gran',
            'grann(y|ies)',
            'guys?',
            'husbands?',
            'lad(y|ies)?',
            'm[ae]n',
            'm[ou]ms?',
            'males?',
            'momm(y|ies)',
            'mommas?',
            'mothers?',
            'papas?',
            'sist(a|er)s?',
            'wi(fe|ves)',
            'wom[ae]n'
        ]
    },


    // Use of gendered pronoun
    {
        name: 'Use of gendered pronoun',
        reason: 'Use of gendered pronouns indicate that you\'re discriminating in favour of a certain gender, or fail to recognise that gender is not binary.',
        solution: 'Replace gendered pronouns with "them" or "they".',
        level: 'error',
        increment: {
            sexism: 1
        },
        triggers: [
            'he|her|him|his|she'
        ]
    },

    // Use of derogatory gendered term
    {
        name: 'Use of derogatory gendered term',
        reason: 'When you use derogatory gendered terms, you\'re being discriminatory. These are offensive in a job post.',
        solution: 'Remove these words.',
        level: 'error',
        increment: {
            sexism: 2,
            culture: 1
        },
        triggers: [
            'bia?tch(es)?',
            'bimbos?',
            'hoes?',
            'hunks?',
            'milfs?',
            'slags?',
            'sluts?',
            'stallions?',
            'studs?'
        ]
    },


    // Mention of facial hair
    {
        name: 'Mention of facial hair',
        reason: 'The use of "grizzled" or "bearded" indicates that you\'re only looking for male developers.',
        solution: 'Remove these words.',
        level: 'error',
        increment: {
            sexism: 1
        },
        triggers: [
            'beard(ed|s|y)?',
            'grizzl(ed|y)'
        ]
    },


    // Use of sexualised terms
    {
        name: 'Use of sexualised terms',
        reason: 'Terms like "sexy code" are often used if the person writing a post doesn\'t know what they are talking about or can\'t articulate what good code is. It can also be an indicator of bro culture or sexism.',
        solution: 'Remove these words.',
        level: 'warning',
        increment: {
            culture: 1
        },
        triggers: [
            'gay for',
            'sexy',
            'hawt',
            'phat'
        ]
    },


    // Use of bro terminology
    {
        name: 'Use of bro terminology',
        reason: 'Bro culture terminology can really reduce the number of people likely to show interest. It discriminates against anyone who doesn\'t fit into a single gender-specific archetype.',
        solution: 'Remove these words.',
        level: 'error',
        increment: {
            culture: 1
        },
        triggers: [
            'bros?',
            'brogramm(er|ers|ing)',
            'crank',
            'crush',
            'dude(bro)?s?',
            'hard[ -]*core',
            'hella',
            'mak(e|ing) it rain',
            'skillz'
        ]
    },


    // Use of dumb job titles
    {
        name: 'Use of dumb job titles',
        reason: 'Referring to tech people as Ninjas or similar devalues the work that they do and shows a lack of respect and professionalism. It\'s also rather cliched and can be an immediate turn-off to many people.',
        solution: 'Consider what you\'re really asking for in an applicant and articulate this in the job post.',
        level: 'warning',
        increment: {
            culture: 1,
            realism: 1
        },
        triggers: [
            'gurus?',
            'hero(es|ic)?',
            'ninjas?',
            'rock[ -]*stars?',
            'super[ -]*stars?',
            'badass(es)?',
            'BAMF'
        ]
    },


    // Mention of hollow benefits
    {
        name: 'Mention of hollow benefits',
        reason: 'Benefits such as "beer fridge" and "pool table" are not bad in themselves, but their appearance in a job post often disguises the fact that there are few real benefits to working for a company. Be wary of these.',
        solution: 'Ensure you\'re outlining real employee benefits if you have them. Don\'t use these as a carrot.',
        level: 'warning',
        increment: {
            culture: 1,
            recruiter: 1
        },
        triggers: [
            'ales?',
            'beers?',
            'brewskis?',
            'coffee',
            '(foos|fuss)[ -]*ball',
            'happy[ -]*hours?',
            'keg(erator)?s?',
            'lagers?',
            'nerf[ -]*guns?',
            'ping[ -]*pong?',
            'pints?',
            'pizzas?',
            'play\\s*stations?',
            'pool[ -]*table|pool',
            'rock[ -]*walls?',
            'table[ -]*football',
            'table[ -]*tennis',
            'wiis?',
            'xbox(es|s)?',
            'massages?'
        ]
    },


    // Competitive environment
    {
        name: 'Competitive environment',
        reason: 'Competition can be healthy, but for a lot of people a heavily competitive environment can be a strain. You could also potentially be excluding people who have more important outside-of-work commitments, such as a family.',
        solution: 'Be wary if you come across as competitive, aim for welcoming and friendly.',
        level: 'notice',
        increment: {
            realism: 1,
            recruiter: 1
        },
        triggers: [
            'compete(?!nt|nce|ncy|ncies)',
            'competition',
            'competitive(?! salary| pay)',
            'cutting[ -]edge',
            'fail',
            'fore[ -]*front',
            'super[ -]*stars?',
            'the best',
            'reach the top',
            'top of .{2,8} (game|class)',
            'win'
        ]
    },


    // New starter expectations
    {
        name: 'New starter expectations',
        reason: 'Terms like "hit the ground running" and others can indicate that the person writing a job post is unaware of the time and effort involved in preparing a new starter for work.',
        solution: 'Reevaluate the use of these terms.',
        level: 'notice',
        increment: {
            realism: 1
        },
        triggers: [
            'hit[ -]the[ -]ground[ -]running',
            'juggle',
            'tight deadlines?'
        ]
    },



    // Use of Meritocracy
    {
        name: 'Use of Meritocracy',
        reason: 'The term "meritocracy" is originally a satirical term relating to how we justify our own successes. Unfortunately, it\'s probably impossible to objectively measure merit, so this usually indicates that the company in question rewards people similar to themselves or using specious metrics.',
        solution: 'Reevaluate the use of this term.',
        level: 'notice',
        increment: {
            realism: 1
        },
        triggers: [
            'meritocra(cy|cies|tic)'
        ]
    },


    // Use of profanity
    {
        name: 'Use of profanity',
        reason: 'While swearing in the workplace can be OK, you shouldn\'t be using profanity in a job post – it\'s unprofessional.',
        solution: 'Remove these words.',
        level: 'warning',
        increment: {
            recruiter: 1
        },
        triggers: [
            'bloody',
            'bugger',
            'cunt',
            'damn',
            'fuck(er|ing)?',
            'piss(ing)?',
            'shit',
            'motherfuck(ers?|ing)'
        ]
    },


    // Use of "visionary" terminology
    {
        name: 'Use of "visionary" terminology',
        reason: 'Terms like "blue sky" and "enlightened" often indicate that a non technical person (perhaps a CEO or stakeholder) has been involved in writing the post. Be down-to-earth, and explain things in plain English.',
        solution: 'Reword these phrases, say what you actually mean.',
        level: 'warning',
        increment: {
            culture: 1,
            realism: 1
        },
        triggers: [
            'blue[ -]*sk(y|ies)',
            'enlighten(ed|ing)?',
            'green[ -]*fields?',
            'incentivi[sz]e',
            'paradigm',
            'producti[sz]e',
            'reach(ed|ing)? out',
            'synerg(y|ize|ise)',
            'visionar(y|ies)'
        ]
    },


    // Need to reassure
    {
        name: 'Need to reassure',
        reason: 'Something feels off when you need to reassure someone of something that should definitely not be an issue in any workplace.',
        solution: 'Reassess the need for these phrases.',
        level: 'notice',
        increment: {
            culture: 1
        },
        triggers: [
            'drama[ -]*free',
            'stress[ -]*free'
        ]
    },


    // Mention of legacy technology
    {
        name: 'Mention of legacy technology',
        reason: 'Legacy technologies can reduce the number of people interested in a job. Sometimes we can\'t avoid this, but extreme legacy tech can often indicate that a company isn\'t willing to move forwards or invest in career development.',
        solution: 'If possible (and you\'re being honest), play down the use of this technology.',
        level: 'notice',
        increment: {
            realism: 1,
            tech: 1
        },
        triggers: [
            'cobol',
            'cvs',
            'front[ -]*page',
            'rcs',
            'sccs',
            'source[ -]*safe',
            'vb\\s*6',
            'visual[ -]*basic\\s*6',
            'vbscript'
        ]
    },


    // Mention of a development environment
    {
        name: 'Mention of a development environment',
        reason: 'Unless you\'re building in a something which requires a certain development environment (e.g. iOS development and XCode), it shouldn\'t matter which tools a developer decides to use to write code – their output will be better if they are working in a familiar environment.',
        solution: 'Don\'t specify a development environment unless absolutely necessary.',
        level: 'notice',
        increment: {
            culture: 1,
            tech: 1
        },
        triggers: [
            'atom',
            'bb[ -]*edit',
            'dream[ -]*weaver',
            'eclipse',
            'emacs',
            'net[ -]*beans',
            'note[ -]*pad',
            'sublime[ -]*text',
            'text[ -]*wrangler',
            'text[ -]*mate',
            'vim?',
            'visual[ -]*studio'
        ]
    },


    // Use of expanded acronyms
    {
        name: 'Use of expanded acronyms',
        reason: 'Tech people know their acronyms; you come across as not very tech-savvy if you expand them.',
        solution: 'Use acronyms in place of these words.',
        level: 'warning',
        increment: {
            recruiter: 1,
            tech: 1
        },
        triggers: [
            'cascading[ -]?style[ -]?sheets',
            'hyper[ -]?text([ -]?mark[ -]?up([ -]?language)?)?'
        ]
    },


    // Java script?
    {
        name: 'Java script?',
        reason: 'JavaScript is one word. You write JavaScript, not javascripts or java script.',
        solution: 'Replace this word with "JavaScript".',
        level: 'error',
        increment: {
            recruiter: 1
        },
        triggers: [
            'java[ -]script|java[ -]*scripts'
        ]
    },


    // Ruby on Rail?
    {
        name: 'Ruby on Rail?',
        reason: 'Ruby On Rails is plural – there is more than one rail.',
        solution: 'Replace this with "Ruby on Rails".',
        level: 'error',
        increment: {
            recruiter: 1
        },
        triggers: [
            'ruby on rail'
        ]
    }

];
