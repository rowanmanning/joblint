'use strict';

var extend = require('extend');

module.exports = joblint;
module.exports.defaults = {
    rules: require('./rules')
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
    Object.keys(result.counts).forEach(function (key) {
        result.counts[key] = Math.max(result.counts[key], 0);
    });
    result.issues = result.issues.sort(sortByPosition);
    return result;
}

function defaultOptions (options) {
    options = extend({}, module.exports.defaults, options);
    options.rules = buildRules(options.rules);
    return options;
}

function buildRules (rules) {
    return rules.map(buildRule);
}

function buildRule (rule) {
    rule = extend(true, {}, rule);
    rule.increment = rule.increment || {};
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

    var context = '{{occurance}}';

    input
        .substr(0, position)
        .split(/[\r\n]+/)
        .pop()
        .replace(/\s+/g, ' ')
        .split(/(\s+)/)
        .reverse()
        .forEach(function (word) {
            if (context.length < 32) {
                context = word + context;
            }
            else if (!/^…/.test(context)) {
                context = '…' + context.trim();
            }
        });

    input
        .substr(position + occurance.length)
        .split(/[\r\n]+/)
        .shift()
        .replace(/\s+/g, ' ')
        .split(/(\s+)/)
        .forEach(function (word) {
            if (context.length < 52) {
                context += word;
            }
            else if (!/…$/.test(context)) {
                context = context.trim() + '…';
            }
        });

    return context.trim();
}

function sortByPosition (a, b) {
    if (a.position > b.position) {
        return 1;
    }
    if (a.position < b.position) {
        return -1;
    }
    return 0;
}
