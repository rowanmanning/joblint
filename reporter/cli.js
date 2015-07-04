'use strict';

var chalk = require('chalk');
var pad = require('pad-component');
var wrap = require('wordwrap')(4, Math.min(process.stdout.columns - 4, 76));

module.exports = report;

function report (result) {
    console.log('\n%s', chalk.cyan.underline('Joblint'));
    if (Object.keys(result.counts).length) {
        console.log('\n%s', chalk.grey('Issue tally:'));
        reportTallyChart(result.counts);
    }
    if (result.issues.length) {
        result.issues.forEach(reportIssue);
    }
    else {
        console.log('\n' + chalk.green('✔ No issues found!'));
    }
    console.log('');
}

function reportTallyChart (counts) {
    var labels = Object.keys(counts);
    var values = labels.map(function (label) {
        return counts[label];
    });
    var bars = values.map(function (count) {
        return pad.right('', count, '█');
    });
    bars = bars.map(padEach(getLongest(bars)));
    labels.map(padEach(getLongest(labels))).forEach(function (label, index) {
        console.log(
            capitalizeFirstLetter(label),
            chalk.grey(' |') + chalk.yellow(bars[index]),
            chalk.grey(' (' + values[index] + ')')
        );
    });
}

function padEach (length, character) {
    return function (value) {
        return pad.right(value, length, character);
    };
}

function getLongest (array) {
    return array.reduce(function (longest, current) {
        if (current.length > longest) {
            return current.length;
        }
        return longest;
    }, 0);
}

function reportIssue (issue) {
    console.log('');
    console.log(
        chalk[getColorForLevel(issue.level)].bold('• ' + issue.name),
        chalk.grey('(' + issue.level + ')')
    );
    console.log(
        ' ',
        issue.context.replace('{{occurance}}', chalk.white.bold.bgRed(issue.occurance))
    );
    console.log(chalk.grey(wrap(chalk.green('✔ ') + issue.solution)));
    console.log(chalk.grey(wrap(chalk.red('✘ ') + issue.reason)));
}

function getColorForLevel (level) {
    if (level === 'error') {
        return 'red';
    }
    if (level === 'warning') {
        return 'yellow';
    }
    return 'cyan';
}

function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
