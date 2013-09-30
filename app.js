'use strict';

var express = require('express');
var config = {
    port: process.env.PORT || 3000
};

initApp();

function initApp () {
    var app = express();
    configureExpress(app);
    loadControllers(app);
    startApp(app);
}

function configureExpress (app) {
    app.disable('x-powered-by');
    app.use(express.static(__dirname + '/public', {
        maxAge: (process.env.NODE_ENV === 'production' ? 604800 : 0)
    }));
    app.use(express.compress());
}

function loadControllers (app) {
    require('./controller/index')(app);
}

function startApp (app) {
    app.listen(config.port, function (err) {
        if (err) {
            console.error('App didn\'t start:');
            console.error(err.stack);
            process.exit(1);
        }
        console.log('App started on port ' + config.port);
    });
}
