'use strict';

module.exports = report;

function report (result, program) {
    var spacing = (program.pretty ? 4 : null);
    var output = JSON.stringify(result, null, spacing);
    console.log(output);
}
