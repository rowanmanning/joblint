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
    report = getReporter(reporter);
    if (!report) {
        handleInputFailure('Reporter "' + reporter + '" was not found');
    }
}

function getReporter (reporter) {
    var path = getLocalReporterPath(reporter) || getModuleReporterPath(reporter);
    if (path) {
        return require(path);
    }
}

function getLocalReporterPath (reporter) {
    try {
        return require.resolve('../lib/report/' + reporter);
    }
    catch (err) {}
}

function getModuleReporterPath (reporter) {
    try {
        return require.resolve(reporter);
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
