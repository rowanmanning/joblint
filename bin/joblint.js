#!/usr/bin/env node
'use strict';

var fs = require('fs');
var joblint = require('../lib/joblint');

runCommand();

function runCommand () {
    if (processHasArgs()) {
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
    console.log(result);
}

function processHasArgs () {
    return (process.argv.length > 2);
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
