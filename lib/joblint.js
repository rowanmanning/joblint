'use strict';

var extend = require('node.extend');

module.exports = joblint;
module.exports.defaults = {
    rules: require('./rules.json')
};

function joblint (text, options) {
    options = defaultOptions(options);
    var result = {
        counts: {},
        issues: []
    };
    options.rules.forEach(function (rule) {
        rule.triggers.forEach(function (trigger) {
            var match;
            while ((match = trigger.exec(text)) !== null) {
                incrementKeys(rule.increment, result.counts);
                result.issues.push(buildIssueFromMatch(match, rule));
            }
        });
    });
    return result;
}

function defaultOptions (options) {
    options = extend(true, {}, module.exports.defaults, options);
    options.rules = buildRules(options.rules);
    return options;
}

function buildRules (rules) {
    return rules.map(buildRule);
}

function buildRule (rule) {
    rule.triggers = rule.triggers.map(function (trigger) {
        return new RegExp('\\b(' + trigger + ')\\b', 'gim');
    });
    return rule;
}

function incrementKeys (amounts, store) {
    Object.keys(amounts).forEach(function (key) {
        if (!store[key]) {
            store[key] = 0;
        }
        store[key] += amounts[key];
    });
}

function buildIssueFromMatch (match, rule) {
    var issue = {
        name: rule.name,
        reason: rule.reason,
        solution: rule.solution,
        level: rule.level,
        increment: rule.increment,
        occurance: match[1],
        position: match.index
    };
    issue.context = buildIssueContext(match.input, issue.occurance, issue.position);
    return issue;
}

function buildIssueContext (input, occurance, position) {

    var context = '{occurance}';

    input
        .substr(0, position)
        .split(/[\r\n]+/g)
        .pop()
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .reverse()
        .forEach(function (word) {
            if (context.length < 30) {
                context = word + ' ' + context;
            }
        });

    input
        .substr(position + occurance.length)
        .split(/[\r\n]+/g)
        .shift()
        .replace(/\s+/g, ' ')
        .trim()
        .split(/[ \t]+/g)
        .forEach(function (word) {
            if (context.length < 50) {
                context += ' ' + word;
            }
        });

    return context.trim();
}
