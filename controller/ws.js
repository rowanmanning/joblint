'use strict';

var joblint = require('joblint');

module.exports = defineController;

function defineController (app) {
    app.all('/ws', function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.post('/ws', requireJsonPostBody, requireUnemptyJobSpec, function (req, res) {
        res.jsonp(joblint(req.body.spec));
    });
    app.all('/ws', function (req, res) {
        return res.jsonp(405, {
            error: 'Method not allowed, POST request expected'
        });
    });
    app.use('/ws', function (err, req, res, next) {
        if (err && err.message === 'invalid json') {
            return res.jsonp(400, {
                error: 'Request body must be a valid JSON object'
            });
        }
        next(err);
    });
}

function requireJsonPostBody (req, res, next) {
    if (!req.is('application/json')) {
        return res.jsonp(400, {
            error: 'Request must have a content-type of "application/json"'
        });
    }
    next();
}

function requireUnemptyJobSpec (req, res, next) {
    if (!req.body.spec || !req.body.spec.trim()) {
        return res.jsonp(400, {
            error: 'Spec must be a non-empty string'
        });
    }
    next();
}
