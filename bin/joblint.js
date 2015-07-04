#!/usr/bin/env node
'use strict';

var fs = require('fs');
var joblint = require('../lib/joblint');
var path = require('path');
var pkg = require('../package.json');
var program = require('commander');
var reportResult;

initProgram();
runProgram();

function initProgram () {
    program
        .version(pkg.version)
        .usage('[options] <path>')
        .option(
            '-r, --reporter <reporter>',
            'the reporter to use: cli (default), json',
            'cli'
        )
        .option(
            '-l, --level <level>',
            'the level of message to fail on (exit with code 1): error, warning, notice',
            'error'
        )
        .option(
            '-p, --pretty',
            'output pretty JSON when using the json reporter'
        )
        .parse(process.argv);
    reportResult = loadReporter(program.reporter);
}

function runProgram () {
    if (program.args.length > 1) {
        program.help();
    }
    if (program.args[0]) {
        return runProgramOnFile(program.args[0]);
    }
    runProgramOnStdIn();
}

function runProgramOnFile (fileName) {
    fs.readFile(fileName, {encoding: 'utf8'}, function (error, data) {
        if (error) {
            console.error('File "' + fileName + '" could not be found');
            process.exit(1);
        }
        handleInputSuccess(data);
    });
}

function runProgramOnStdIn () {
    if (isTty(process.stdin)) {
        program.help();
    }
    captureStdIn(handleInputSuccess);
}

function handleInputSuccess (data) {
    var result = joblint(data);
    reportResult(result, program);
    if (reportShouldFail(result, program.level)) {
        process.exit(1);
    }
}

function loadReporter (name) {
    var reporter = requireFirst([
        '../reporter/' + name,
        name,
        path.join(process.cwd(), name)
    ], null);
    if (!reporter) {
        console.error('Reporter "' + name + '" could not be found');
        process.exit(1);
    }
    return reporter;
}

function requireFirst (stack, defaultReturn) {
    if (!stack.length) {
        return defaultReturn;
    }
    try {
        return require(stack.shift());
    }
    catch (error) {
        return requireFirst(stack, defaultReturn);
    }
}

function reportShouldFail (result, level) {
    if (level === 'none') {
        return false;
    }
    if (level === 'notice') {
        return (result.issues.length > 0);
    }
    if (level === 'warning') {
        return (result.issues.filter(isWarningOrError).length > 0);
    }
    return (result.issues.filter(isError).length > 0);
}

function isError (result) {
    return (result.level === 'error');
}

function isWarningOrError (result) {
    return (result.level === 'warning' || result.level === 'error');
}

function captureStdIn (done) {
    var data = '';
    process.stdin.resume();
    process.stdin.on('data', function (chunk) {
        data += chunk;
    });
    process.stdin.on('end', function () {
        done(data);
    });
}

function isTty (stream) {
    return (stream.isTTY === true);
}
