'use strict';

module.exports = defineController;

function defineController (app) {
    app.get('/developer', function (req, res) {
        res.render('developer');
    });
}
