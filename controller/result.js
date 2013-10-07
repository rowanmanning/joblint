'use strict';

var joblint = require('joblint');

module.exports = defineController;

function defineController (app) {
    app.get('/result', function (req, res) {
        res.redirect('/');
    });
    app.post('/result', requireUnemptyJobSpec, function (req, res) {
        var result = joblint(req.body.spec);
        res.render('result', {
            hasFailPoints: result.hasFailPoints(),
            isClean: result.isClean(),
            result: result
        });
    });
}

function requireUnemptyJobSpec (req, res, next) {
    if (!req.body.spec || !req.body.spec.trim()) {
        return res.redirect('/');
    }
    next();
}
