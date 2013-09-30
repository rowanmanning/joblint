#!/usr/bin/env node
'use strict';

var fs = require('fs'),
    joblint = require('../lib/joblint'),
    path = require('path'),
    program = require('commander'),
    pkg = require('../package.json'),
    report;

initProgram();

function initProgram () {
    program
        .version(pkg.version)
        .usage('[options] <file>')
        .option('-r, --reporter [type]', 'Use the specified reporter [cli]', 'cli')
        .option('-R, --rules [directory]',
                'Use the specified directory for rules [./lib/rule]',
                path.join(path.dirname(path.dirname(module.filename)), './lib/rule'))
        .parse(process.argv);
    loadReporter(program.reporter);
    runCommand();
}

function loadReporter (reporter) {
    loadLocalReporter(reporter);
    if (!report) {
        loadModuleReporter(reporter);
    }
    if (!report) {
        handleInputFailure('Reporter "' + reporter + '" was not found');
    }
}

function loadLocalReporter (reporter) {
    try {
        report = require('../lib/report/' + reporter);
    }
    catch (err) {}
}

function loadModuleReporter (reporter) {
    try {
        report = require(reporter);
    }
    catch (err) {}
}

function runCommand () {
    if (program.args.length) {
        runCommandOnFile(process.argv[2]);
    } else {
        runCommandOnStdIn();
    }
}

function runCommandOnFile (fileName) {
    fs.readFile(fileName, {encoding: 'utf8'}, function (err, data) {
        if (err) {
            handleInputFailure('File "' + fileName + '" not found');
        } else {
            handleInputSuccess(data);
        }
    });
}

function runCommandOnStdIn () {
    captureStdIn(handleInputSuccess);
}

function handleInputFailure (msg) {
    console.error(msg);
    process.exit(1);
}

function handleInputSuccess (data) {
    var result = joblint(program.rules, data);
    report(result);
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
