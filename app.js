'use strict';

var config = {
    port: process.env.PORT || 3000
};
var express = require('express');
var hbs = require('express-hbs');

initApp();

function initApp () {
    var app = express();
    configureExpress(app);
    configureViews(app);
    loadViewHelpers();
    setViewLocals(app);
    loadControllers(app);
    startApp(app);
}

function configureExpress (app) {
    app.disable('x-powered-by');
    app.use(express.static(__dirname + '/public', {
        maxAge: (process.env.NODE_ENV === 'production' ? 604800 : 0)
    }));
    app.use(express.compress());
    app.use(express.urlencoded());
    app.use(express.json());
}

function configureViews (app) {
    app.set('views', __dirname + '/view');
    app.engine('html', hbs.express3({
        partialsDir: __dirname + '/view/partial',
        contentHelperName: 'content',
        defaultLayout: __dirname + '/view/layout/default.html',
        extname: 'html',
        layoutsDir: __dirname + '/view/layout'
    }));
    app.set('view engine', 'html');
}

function loadViewHelpers () {
    require('./view/helper/points')(hbs.registerHelper);
}

function setViewLocals (app) {
    app.locals({
        isProduction: (process.env.NODE_ENV === 'production'),
        lang: 'en',
        year: (new Date()).getFullYear()
    });
    app.use(function (req, res, next) {
        res.locals.isHomePage = (req.path === '/');
        next();
    });
}

function loadControllers (app) {
    require('./controller/developer')(app);
    require('./controller/index')(app);
    require('./controller/ws')(app);
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
