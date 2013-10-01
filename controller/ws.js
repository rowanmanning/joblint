'use strict';

var joblint = require('joblint');

module.exports = defineController;

function defineController (app) {
    app.all('/ws', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });
    app.post('/ws', requireUrlEncodedPostBody, requireUnemptyJobSpec, function (req, res) {
        res.jsonp(joblint(req.body.spec));
    });
    app.all('/ws', function (req, res) {
        return res.jsonp(405, {
            error: 'Method not allowed, POST request expected'
        });
    });
}

function requireUrlEncodedPostBody (req, res, next) {
    if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
        return res.jsonp(400, {
            error: 'Request must have a content-type of "application/x-www-form-urlencoded"'
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
