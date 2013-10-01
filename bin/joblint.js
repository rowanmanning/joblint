#!/usr/bin/env node
'use strict';

var fs = require('fs');
var joblint = require('../lib/joblint');
var program = require('commander');
var pkg = require('../package.json');
var report;

initProgram();

function initProgram () {
    program
        .version(pkg.version)
        .usage('[options] <file>')
        .option('-r, --reporter [type]', 'Use the specified reporter [cli]', 'cli')
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
    if (isTty(process.stdin)) {
        program.help();
    } else {
        captureStdIn(handleInputSuccess);
    }
}

function handleInputFailure (msg) {
    console.error(msg);
    process.exit(1);
}

function handleInputSuccess (data) {
    var result = joblint(data);
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

function isTty (stream) {
    return true === stream.isTTY;
}
