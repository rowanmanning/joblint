'use strict';

var joblint = require('joblint');

module.exports = defineController;

function defineController (app) {
    app.get('/result', function (req, res) {
        res.redirect('/');
    });
    app.post('/result', requireUnemptyJobSpec, function (req, res) {
        res.render('result', {
            result: joblint(req.body.spec)
        });
    });
}

function requireUnemptyJobSpec (req, res, next) {
    if (!req.body.spec || !req.body.spec.trim()) {
        return res.redirect('/');
    }
    next();
}
