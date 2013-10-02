/* jshint maxstatements: false, maxlen: false */
'use strict';

var chalk = require('chalk');
var log = console.log.bind(console);
var pad = require('pad-component');
var wrap = require('wordwrap')(2, Math.min(process.stdout.columns, 80));

module.exports = report;

function report (result, opts) {
    opts = opts || {};
    logHeading('Joblint');
    if (result.isClean()) {
        logSuccess();
        log();
    }
    if (result.hasFailPoints()) {
        logFailCharts(result.failPoints);
        log();
    }
    if (result.hasMessages()) {
        logMessages('error', 'red', opts.verbose, result.errors);
        logMessages('warning', 'yellow', opts.verbose, result.warnings);
        logMessages('notice', 'grey', opts.verbose, result.notices);
        log();
    }
}

function logHeading (heading) {
    log('\n' + chalk.cyan.underline(heading) + '\n');
}

function logSuccess () {
    log(chalk.green('No issues found with the job spec!'));
}

function logFailCharts (points) {
    var dataSet = [
        {label: 'Culture', value: points.culture},
        {label: 'Realism', value: points.realism},
        {label: 'Recruiter', value: points.recruiter},
        {label: 'Tech', value: points.tech}
    ];
    var maxLabelLength = maxVal(dataSet.map(function (set) {
        return set.label.length;
    }));
    var maxValue = maxVal(dataSet.map(function (set) {
        return set.value;
    }));
    dataSet.forEach(function (set) {
        logFailChart(set.label, maxLabelLength, set.value, maxValue);
    });
}

function logFailChart (label, maxLabelLength, value, maxValue) {
    var fullLabel = label + ' Fails';
    var bar = pad.right('', value, '█');
    var num = '(' + value + ')';
    log([
        pad.right(fullLabel, maxLabelLength + 6),
        chalk.grey('|') + chalk.yellow(pad.right(bar, maxValue, ' ')),
        chalk.grey(num)
    ].join('  '));
}

function maxVal (arr) {
    return Math.max.apply(null, arr);
}

function logMessages (type, color, verbose, messages) {
    messages.forEach(logMessage.bind(null, type, color, verbose));
}

function logMessage (type, color, verbose, message) {
    log([
        chalk[color]('•'),
        message.message,
        chalk.grey('(' + type + ')')
    ].join(' '));
    if (verbose) {
        log(chalk.grey(wrap(message.detail)));
    }
}
