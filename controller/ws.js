'use strict';

var joblint = require('joblint');

module.exports = defineController;

function defineController (app) {
    app.post('/ws', requireUrlEncodedPostBody, requireUnemptyJobSpec, function (req, res) {
        res.send(joblint(req.body.spec));
    });
    app.all('/ws', function (req, res) {
        return res.send(405, {
            error: 'Method not allowed, POST request expected'
        });
    });
}

function requireUrlEncodedPostBody (req, res, next) {
    if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
        return res.send(400, {
            error: 'Request must have a content-type of "application/x-www-form-urlencoded"'
        });
    }
    next();
}

function requireUnemptyJobSpec (req, res, next) {
    if (!req.body.spec || !req.body.spec.trim()) {
        return res.send(400, {
            error: 'Spec must be a non-empty string'
        });
    }
    next();
}
