'use strict';

var createLinter = require('./linter'),
    fs = require('fs'),
    path = require('path');

module.exports = function (rules, body) {
    if (!body) {
        body = rules;
        rules = './lib/rule';
    }

    function joblint(body) {
        var linter = createLinter();
        injectRulesIntoLinter(linter);
        return linter.lint(body);
    }

    function injectRulesIntoLinter(linter) {
        fs.readdirSync(rules).filter(function (file) {
            return file.match(/\.js$/i);
        }).forEach(function (file) {
            file = path.join(rules, file);
            file = path.resolve(file.indexOf('/') > 0 &&
                                path.join(process.cwd(), file) ||
                                file);

            var rule = require(file);
            if (typeof rule === 'function') {
                rule(linter);
            }
        });
    }

    return joblint(body);
};
