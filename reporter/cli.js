'use strict';

var chalk = require('chalk');
var wrap = require('wordwrap')(4, Math.min(process.stdout.columns - 4, 76));

module.exports = report;

function report (result) {
    console.log('\n%s', chalk.cyan.underline('Joblint'));
    result.issues.forEach(reportIssue);
    console.log('');
}

function reportIssue (issue) {
    console.log('');
    console.log(
        chalk[getColorForLevel(issue.level)]('•'),
        chalk[getColorForLevel(issue.level)].bold(issue.name),
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
