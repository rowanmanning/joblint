'use strict';

module.exports = defineController;

function defineController (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
}
